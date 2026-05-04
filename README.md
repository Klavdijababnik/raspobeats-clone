# Raspobeats mirror

This repo contains the original fetched BeatStars/raspobeats HTML plus a small local proxy server for mirror-style preview.

## Why proxy?

The original site is a BeatStars Angular app that expects to run from the domain root and load external BeatStars routes/assets. GitHub Pages project paths can leave the app blank/loading, so the most faithful preview is via the Node proxy.

## Run locally

```bash
node proxy-server.js
```

Then open:

```text
http://127.0.0.1:4910/
```

## Public temporary preview

Use Cloudflare quick tunnel:

```bash
cloudflared tunnel --url http://127.0.0.1:4910
```

The generated trycloudflare URL is temporary and changes after restart.

## Files

- `index.original.html` — original fetched HTML from `https://raspobeats.com/`
- `index.html` / `404.html` — current HTML copy
- `proxy-server.js` — mirror/proxy server that serves the original site as a root app
