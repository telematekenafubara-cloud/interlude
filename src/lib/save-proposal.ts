/** Download a printable copy. window.print() is blocked inside the Grok iframe. */

export function downloadProposalHtml(source: HTMLElement) {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-no-print]").forEach((node) => node.remove());
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Interlude — Funding proposal</title>
  <style>
    :root { color-scheme: light; }
    body {
      margin: 0;
      background: #fff;
      color: #111;
      font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
      line-height: 1.55;
    }
    main { max-width: 40rem; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
    h1 { font-size: 2.4rem; font-weight: 400; letter-spacing: -0.03em; margin: 0.3rem 0 0; }
    h2 { font-size: 1.45rem; font-weight: 400; letter-spacing: -0.02em; margin: 0 0 0.75rem; }
    p, li { font-size: 0.98rem; }
    p { margin: 0.6rem 0; }
    ul, ol { padding-left: 1.2rem; }
    code { font-family: ui-monospace, Menlo, monospace; font-size: 0.86em; }
    section, header { border-bottom: 1px solid #ddd; padding: 1.6rem 0; }
    header { padding-top: 0; }
    a { color: inherit; }
    @media print {
      main { padding: 0; max-width: none; }
      section, header { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main>${clone.innerHTML}</main>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Interlude-funding-proposal.html";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  return true;
}

export function printProposal() {
  try {
    window.print();
    return true;
  } catch {
    return false;
  }
}
