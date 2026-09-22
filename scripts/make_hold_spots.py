#!/usr/bin/env python3
"""Unique 8s audio bed + cinematic camera mp4 for every Hold without a filmed original."""
from __future__ import annotations
import hashlib, subprocess, time, wave
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import numpy as np

ROOT = Path("/workspace")
ADS = ROOT / "public" / "ads"
ADS.mkdir(exist_ok=True)
SR = 44100
DUR = 8.0
FILMED = {"/ads/northline.mp4", "/ads/solace.mp4"}


def parse(path: Path):
    import re

    items, cur = [], {}
    for line in path.read_text().splitlines():
        if re.match(r'    id: "', line):
            if cur.get("still") and cur.get("name"):
                items.append(cur)
            cur = {"id": re.search(r'"([^"]+)"', line).group(1)}
        elif re.match(r'    name: "', line):
            cur["name"] = re.search(r'"([^"]+)"', line).group(1)
        elif re.match(r'    still: "', line):
            cur["still"] = re.search(r'"([^"]+)"', line).group(1)
        elif re.match(r'    video: "', line):
            cur["video"] = re.search(r'"([^"]+)"', line).group(1)
    if cur.get("still") and cur.get("name"):
        items.append(cur)
    return items


def rng(seed: str):
    h = hashlib.sha256(seed.encode()).digest()
    return np.random.default_rng(int.from_bytes(h[:8], "little"))


def bed(ad_id: str) -> np.ndarray:
    g = rng(ad_id)
    n = int(SR * DUR)
    t = np.arange(n) / SR
    root = float(g.choice([110, 123.47, 130.81, 146.83, 164.81, 174.61, 196.0, 220.0]))
    intervals = g.choice(
        [
            np.array([0, 3, 7, 10]),
            np.array([0, 4, 7, 11]),
            np.array([0, 2, 7, 9]),
            np.array([0, 5, 7, 12]),
            np.array([0, 3, 6, 10]),
        ]
    )
    bpm = float(g.uniform(68, 118))
    beat = 60.0 / bpm
    sub = 0.45 * np.sin(2 * np.pi * (root / 2) * t)
    pad = np.zeros(n)
    for i, iv in enumerate(intervals):
        freq = root * (2 ** (iv / 12))
        env = 0.5 + 0.5 * np.sin(2 * np.pi * t / DUR + i)
        wave_ = np.sin(2 * np.pi * freq * t + 0.15 * np.sin(2 * np.pi * 0.2 * t))
        kind = int(g.integers(0, 4))
        if kind == 1:
            wave_ = np.sign(wave_) * (np.abs(wave_) ** 0.7)
        elif kind == 2:
            wave_ = np.sin(2 * np.pi * freq * t) * np.sin(2 * np.pi * (freq * 1.5) * t)
        elif kind == 3:
            wave_ = np.sin(2 * np.pi * freq * t + 0.4 * np.sin(2 * np.pi * freq * 2 * t))
        pad += 0.16 * env * wave_
    pluck = np.zeros(n)
    hits = int(g.integers(6, 14))
    for k in range(hits):
        start = int((0.2 + k * beat * g.uniform(0.85, 1.4)) * SR)
        if start >= n - 1000:
            break
        freq = root * (2 ** (int(g.choice(intervals)) / 12)) * float(g.choice([1, 2, 4]))
        length = int(SR * g.uniform(0.12, 0.55))
        tt = np.arange(length) / SR
        tone = np.sin(2 * np.pi * freq * tt) * np.exp(-tt * g.uniform(4, 12))
        end = min(n, start + length)
        pluck[start:end] += 0.28 * tone[: end - start]
    noise = g.normal(0, 0.02, n)
    kernel = np.ones(int(g.integers(8, 40)))
    kernel /= kernel.size
    noise = np.convolve(noise, kernel, mode="same")
    mix = sub + pad + pluck + noise
    fade = int(0.08 * SR)
    mix[:fade] *= np.linspace(0, 1, fade)
    mix[-fade:] *= np.linspace(1, 0, fade)
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.85
    return mix.astype(np.float32)


def write_wav(path: Path, x: np.ndarray):
    pcm = np.clip(x, -1, 1)
    pcm = (pcm * 32767).astype(np.int16)
    with wave.open(str(path), "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def resolve_still(h: dict) -> Path | None:
    hid = h["id"]
    uniq = ADS / f"{hid}-hold.jpg"
    named = ADS / f"{hid}.jpg"
    catalog = ADS / Path(h.get("still", "")).name if h.get("still") else None
    for p in (uniq, named, catalog):
        if p and p.exists() and p.stat().st_size > 8_000:
            return p
    return None


def mux(still: Path, wav: Path, out: Path, seed: str):
    g = rng(seed + "cam")
    mode = int(g.integers(0, 6))
    z1 = float(g.uniform(1.34, 1.58))
    step = float(g.uniform(0.0020, 0.0032))
    if mode == 0:
        x, y = "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"
    elif mode == 1:
        x, y = "iw/2-(iw/zoom/2)+on*1.35", "ih/2-(ih/zoom/2)"
    elif mode == 2:
        x, y = "iw/2-(iw/zoom/2)-on*1.25", "ih/2-(ih/zoom/2)"
    elif mode == 3:
        x, y = "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)-on*0.85"
    elif mode == 4:
        x, y = "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)+on*0.8"
    else:
        x, y = "iw/2-(iw/zoom/2)+on*0.95", "ih/2-(ih/zoom/2)-on*0.55"
    sat = float(g.uniform(1.04, 1.14))
    vf = (
        "scale=1920:1080:force_original_aspect_ratio=increase,"
        "crop=1920:1080,"
        f"zoompan=z='min(zoom+{step:.4f},{z1:.3f})':x='{x}':y='{y}':d=1:s=1280x720:fps=24,"
        f"eq=brightness='0.035*sin(2*PI*t/6.2)':contrast=1.06:saturation={sat:.3f},"
        "vignette=PI/5,"
        "format=yuv420p"
    )
    cmd = [
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-loop", "1", "-i", str(still),
        "-i", str(wav),
        "-t", "8",
        "-vf", vf,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "ultrafast", "-crf", "20",
        "-c:a", "aac", "-b:a", "160k",
        "-shortest",
        "-movflags", "+faststart",
        str(out),
    ]
    subprocess.check_call(cmd)


def build_one(h: dict, tmp: Path) -> str:
    still = resolve_still(h)
    if still is None:
        return f"no still {h['id']}"
    wav = tmp / f"{h['id']}.wav"
    if not wav.exists():
        write_wav(wav, bed(h["id"]))
    out = ADS / f"{h['id']}.mp4"
    mux(still, wav, out, h["id"])
    return f"spot {h['id']} {still.name} {out.stat().st_size}"


def main():
    holds = parse(ROOT / "src/lib/ads.ts") + parse(ROOT / "src/lib/hold-catalog.ts")
    holds = [h for h in holds if h.get("name")]
    tmp = ROOT / "tmp" / "hold_audio"
    tmp.mkdir(parents=True, exist_ok=True)
    jobs = []
    skipped = 0
    for h in holds:
        out = ADS / f"{h['id']}.mp4"
        if h.get("video") in FILMED:
            skipped += 1
            continue
        # Living I2V spots are large; do not clobber them with kenburns.
        if out.exists() and out.stat().st_size > 2_000_000:
            skipped += 1
            continue
        if out.exists() and (time.time() - out.stat().st_mtime) < 900 and out.stat().st_size > 250_000:
            skipped += 1
            continue
        jobs.append(h)
    print("remux", len(jobs), "skip filmed", skipped, flush=True)
    made = 0
    with ThreadPoolExecutor(max_workers=4) as pool:
        futs = {pool.submit(build_one, h, tmp): h["id"] for h in jobs}
        for fut in as_completed(futs):
            try:
                line = fut.result()
            except Exception as e:
                line = f"fail {futs[fut]} {e}"
            made += 1
            print(line, flush=True)
    print("done", made, "skipped filmed", skipped)


if __name__ == "__main__":
    main()
