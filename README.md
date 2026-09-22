# Interlude

The wait is the inventory.

**Holdey** answers while a **Hold** plays. Skip after 5 seconds. Ads rotate until skip. Bank, Network, Studio, and the Hold SDK (`/hold.js`) live on the same site.

- Live: [interlude-vert.vercel.app](https://interlude-vert.vercel.app)
- Source: [github.com/telematekenafubara-cloud/interlude](https://github.com/telematekenafubara-cloud/interlude)

Holdey (answers, pictures, clips) is connected on the live site. Secrets stay in Vercel — never in this repository, never in the page, never in share cards.

## Hold SDK

Publishers load:

```html
<script src="https://interlude-vert.vercel.app/hold.js"></script>
```

Then:

```js
Interlude.whileWaiting(async () => {
  const answer = await fetch("/ask", { method: "POST", body: JSON.stringify({ q }) });
  return answer.json();
});
```

Holds skip after 5 seconds; spots rotate every 8 seconds until skip.

## Updating

Push to `main`. The Vercel project rebuilds from this repo.

Share cards use `public/og.jpg` (1200×630). The X feed banner is `public/x-banner.jpg`.
