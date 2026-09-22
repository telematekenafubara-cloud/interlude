# Interlude

The wait is the inventory.

**Holdey** answers while a **Hold** plays. Skip after 5 seconds. Ads rotate until skip. Bank, Network, Studio, and the Hold SDK (`/hold.js`) live on the same site.

Live source: [github.com/telematekenafubara-cloud/interlude](https://github.com/telematekenafubara-cloud/interlude)

## Deploy on Vercel (does not use Grok Publish)

This is the public app — Holdey, Holds, share card, SDK — on your own URL (`interlude.vercel.app`, or a custom domain).

### One-click import

1. Open **[Import Interlude on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/telematekenafubara-cloud/interlude&project-name=interlude&repository-name=interlude&env=XAI_API_KEY&envDescription=xAI%20API%20key%20for%20Holdey%20(Grok%20answers,%20pictures,%20clips)&envLink=https://console.x.ai/)**.
2. Sign in to Vercel with the same GitHub account (`telematekenafubara-cloud`).
3. Paste your **xAI API key** into `XAI_API_KEY` (Holdey pictures, clips, and Grok answers). Leave it blank if you only want the site and Holds, without generated media.
4. Click **Create** / **Deploy**.
5. When the build is green, open the `*.vercel.app` URL. That is the live Interlude — share cards use `public/og.jpg` (1200×630).

If the clone form asks to create a *new* repo, cancel and use **[Import existing](https://vercel.com/new/import?s=https://github.com/telematekenafubara-cloud/interlude)** instead — this repository already exists.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Required | Used for |
| --- | --- | --- |
| `XAI_API_KEY` | For Grok in Holdey | Answers on Grok, pictures, clips |
| `GEMINI_API_KEY` | No | Holdey Answers / Hold copy via Gemini |
| `OPENAI_API_KEY` | No | Holdey Answers / Hold copy via ChatGPT |
| `ANTHROPIC_API_KEY` | No | Holdey Answers / Hold copy via Claude |

Apply to **Production**, **Preview**, and **Development**. Redeploy after adding keys.

Do not put keys in this repository.

### Framework

Vercel should detect **TanStack Start**. If it does not:

- Framework: `tanstack-start`
- Build command: `npm run build`
- Install: `npm install`
- Node.js: `22.x`

## Hold SDK

Publishers load:

```html
<script src="https://YOUR-DOMAIN/hold.js"></script>
```

Then:

```js
Interlude.whileWaiting(async () => {
  const answer = await fetch("/ask", { method: "POST", body: JSON.stringify({ q }) });
  return answer.json();
});
```

Holds skip after 5 seconds; spots rotate every 8 seconds until skip.

## Updating later

Push to `main` on this GitHub repo. Vercel rebuilds automatically once the project is linked.

Grok Publish (the button in Grok) is a *separate* snapshot. It does not read this GitHub repo. Use Vercel when you want a URL you control.
