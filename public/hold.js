/**
 * Interlude Hold — drop-in wait-time ads for any AI product you ship.
 *
 *   const answer = await Interlude.whileWaiting(replyEl, () => askModel(prompt));
 *
 * The Hold plays in `replyEl`. After 5 seconds a skip arrow appears.
 * If you leave it, the next Hold starts. Skipping hides ads; your request still finishes.
 */
(function (global) {
  "use strict";

  var SKIP_AFTER = 5000;
  var SPOT = 8000;

  function unlockSound() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      var ctx = new Ctx();
      if (ctx.state === "suspended" && ctx.resume) ctx.resume();
      var buf = ctx.createBuffer(1, 1, 22050);
      var src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    } catch (e) {
      /* ignore */
    }
  }

  function origin() {
    try {
      if (document.currentScript && document.currentScript.src) {
        return new URL(document.currentScript.src).origin;
      }
    } catch (e) {
      /* fall through */
    }
    return location.origin;
  }

  function ads(base) {
    return [
      {
        id: "northline",
        name: "Northline",
        category: "Grand touring",
        tagline: "Night roads, quietly.",
        cta: "Reserve a night drive",
        still: base + "/ads/northline.jpg",
        video: base + "/ads/northline.mp4",
      },
      {
        id: "solace",
        name: "Maison Solace",
        category: "Fragrance",
        tagline: "A note made of smoke and evening light.",
        cta: "Discover the note",
        still: base + "/ads/solace.jpg",
        video: base + "/ads/solace.mp4",
      },
      {
        id: "harbor",
        name: "Harbor & Pine",
        category: "Lodging",
        tagline: "Wake on the lake. Leave no itinerary.",
        cta: "See the rooms",
        still: base + "/ads/harbor.jpg",
      },
      {
        id: "vale",
        name: "Atelier Vale",
        category: "Cloth",
        tagline: "One coat. A decade.",
        cta: "View the coat",
        still: base + "/ads/vale.jpg",
      },
      {
        id: "kite",
        name: "Kite Audio",
        category: "Listening",
        tagline: "Close the room. Keep the mix.",
        cta: "Hear the pair",
        still: base + "/ads/kite.jpg",
      },
    ];
  }

  var CSS = [
    ":host{all:initial;position:absolute;inset:0;display:block;z-index:20;font-family:ui-sans-serif,system-ui,sans-serif;color:#f4f1ea}",
    ".stage{position:absolute;inset:0;overflow:hidden;background:#0b0b0a;border-radius:inherit}",
    ".media{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
    ".wash{position:absolute;inset:0;background:linear-gradient(to top,#0b0b0a 8%,rgba(11,11,10,.45) 45%,rgba(11,11,10,.12))}",
    ".top{position:absolute;inset:0 0 auto;display:flex;justify-content:space-between;align-items:flex-start;padding:14px;z-index:2}",
    ".ad{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:999px;background:rgba(11,11,10,.55);font-size:10px;letter-spacing:.16em;text-transform:uppercase}",
    ".cat{margin-left:8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,241,234,.7)}",
    ".right{display:flex;align-items:center;gap:8px}",
    ".time{font-variant-numeric:tabular-nums;font-size:12px;color:rgba(244,241,234,.85)}",
    ".skip{display:none;place-items:center;width:44px;height:44px;border:0;border-radius:999px;background:rgba(11,11,10,.72);color:#f4f1ea;cursor:pointer;box-shadow:0 0 0 1px rgba(244,241,234,.18)}",
    ".skip.on{display:grid}",
    ".skip svg{width:16px;height:16px}",
    ".bot{position:absolute;left:0;right:0;bottom:0;padding:18px;z-index:2}",
    ".name{font-family:ui-serif,Georgia,serif;font-size:28px;line-height:1;margin:0}",
    ".line{margin:8px 0 0;font-size:14px;line-height:1.45;color:rgba(244,241,234,.82);max-width:28rem}",
    ".cta{margin-top:14px;display:inline-flex;align-items:center;height:44px;padding:0 16px;border:0;border-radius:12px;background:#e8e2d6;color:#0b0b0a;font-size:14px;font-weight:500;cursor:pointer}",
    ".bar{position:absolute;left:0;right:0;bottom:0;height:2px;background:rgba(244,241,234,.15);z-index:3}",
    ".fill{height:100%;width:0;background:#e8e2d6;transform-origin:left}",
  ].join("");

  function pick(list, id) {
    if (id) {
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    }
    return list[Math.floor(Math.random() * list.length)] || list[0];
  }

  function resolveEl(target) {
    if (typeof target === "string") return document.querySelector(target);
    return target;
  }

  function play(target, opts) {
    opts = opts || {};
    var el = resolveEl(target);
    if (!el) throw new Error("Interlude: missing target element");

    var catalog = ads(origin());
    var ad = pick(catalog, opts.ad);
    var skipAfter = opts.skipAfterMs || SKIP_AFTER;
    var minHold = opts.minMs || SPOT;

    var prevPos = el.style.position;
    var prevMin = el.style.minHeight;
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    if (!el.style.minHeight && el.clientHeight < 220) el.style.minHeight = "280px";

    var host = document.createElement("div");
    host.setAttribute("data-interlude-hold", "");
    var shadow = host.attachShadow({ mode: "open" });
    var style = document.createElement("style");
    style.textContent = CSS;
    shadow.appendChild(style);

    var stage = document.createElement("div");
    stage.className = "stage";
    var media;
    if (ad.video && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      media = document.createElement("video");
      media.src = ad.video;
      media.poster = ad.still;
      media.autoplay = true;
      media.muted = false;
      media.volume = 0.9;
      media.loop = true;
      media.playsInline = true;
      media.setAttribute("playsinline", "");
      var playAttempt = media.play();
      if (playAttempt && playAttempt.catch) {
        playAttempt.catch(function () {
          media.muted = true;
          media.play();
        });
      }
      media.onerror = function () {
        var img = document.createElement("img");
        img.src = ad.still;
        img.alt = "";
        img.className = "media";
        media.replaceWith(img);
      };
    } else {
      media = document.createElement("img");
      media.src = ad.still;
      media.alt = "";
    }
    media.className = "media";

    stage.innerHTML =
      '<div class="wash"></div>' +
      '<div class="top"><div><span class="ad">Ad</span><span class="cat"></span></div>' +
      '<div class="right"><span class="time"></span>' +
      '<button class="skip" type="button" aria-label="Skip ad">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' +
      "</button></div></div>" +
      '<div class="bot"><p class="name"></p><p class="line"></p>' +
      '<button class="cta" type="button"></button></div>' +
      '<div class="bar"><div class="fill"></div></div>';

    stage.insertBefore(media, stage.firstChild);
    stage.querySelector(".cat").textContent = ad.category;
    stage.querySelector(".name").textContent = ad.name;
    stage.querySelector(".line").textContent = ad.tagline;
    stage.querySelector(".cta").textContent = ad.cta;
    shadow.appendChild(stage);
    el.appendChild(host);

    var skipped = false;
    var skipWaiters = [];
    var started = performance.now();
    var raf = 0;
    var skipBtn = stage.querySelector(".skip");
    var timeEl = stage.querySelector(".time");
    var fill = stage.querySelector(".fill");

    skipBtn.addEventListener("click", function () {
      skipped = true;
      skipWaiters.splice(0).forEach(function (fn) {
        fn();
      });
    });

    function tick(now) {
      var elapsed = now - started;
      timeEl.textContent = (Math.max(0, minHold - elapsed) / 1000).toFixed(1) + "s";
      fill.style.width = Math.min(100, (elapsed / minHold) * 100) + "%";
      if (elapsed >= skipAfter) skipBtn.classList.add("on");
      if (elapsed < minHold && !skipped) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function destroy() {
      cancelAnimationFrame(raf);
      if (!host._ilReported) {
        host._ilReported = true;
        try {
          window.dispatchEvent(
            new CustomEvent("interlude:impression", {
              detail: {
                ad: ad.id,
                skipped: skipped,
                source: "hold.js",
                viewer: viewerId,
                holder: holderId,
              },
            }),
          );
        } catch (err) {
          /* ignore */
        }
      }
      if (host.parentNode) host.parentNode.removeChild(host);
      el.style.position = prevPos;
      el.style.minHeight = prevMin;
    }

    return {
      started: started,
      minHold: minHold,
      get skipped() {
        return skipped;
      },
      untilSkipped: function () {
        if (skipped) return Promise.resolve();
        return new Promise(function (resolve) {
          skipWaiters.push(resolve);
        });
      },
      destroy: destroy,
    };
  }

  function whileWaiting(target, work, opts) {
    opts = opts || {};
    unlockSound();
    var el = resolveEl(target);
    if (!el) throw new Error("Interlude: missing target element");
    var catalog = ads(origin());
    var index = 0;
    var workP = Promise.resolve().then(work);
    var done = false;
    var value;
    var err;
    workP.then(
      function (v) {
        done = true;
        value = v;
      },
      function (e) {
        done = true;
        err = e;
      },
    );

    function sleep(ms) {
      return new Promise(function (r) {
        setTimeout(r, ms);
      });
    }

    function spot() {
      var ad = catalog[index % catalog.length];
      var ctl = play(el, {
        ad: ad.id,
        skipAfterMs: opts.skipAfterMs || SKIP_AFTER,
        minMs: opts.minMs || SPOT,
      });
      return Promise.race([
        ctl.untilSkipped().then(function () {
          return "skip";
        }),
        sleep(ctl.minHold).then(function () {
          return "end";
        }),
      ]).then(function (why) {
        ctl.destroy();
        if (why === "skip" || done) return workP;
        index += 1;
        return spot();
      });
    }

    return spot().then(function () {
      if (err) throw err;
      return value;
    });
  }

  var viewerId = null;
  var holderId = null;

  function identify(id) {
    viewerId = id || null;
  }

  function holder(id) {
    holderId = id || null;
  }

  global.Interlude = {
    play: play,
    whileWaiting: whileWaiting,
    identify: identify,
    holder: holder,
    SKIP_AFTER_MS: SKIP_AFTER,
    SPOT_MS: SPOT,
    MIN_HOLD_MS: SPOT,
  };
})(typeof window !== "undefined" ? window : this);
