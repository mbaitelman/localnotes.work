# localnotes.work

A minimal, in-browser notepad. Notes are stored in `localStorage`, addressable by title via hash-based routing (`#/note-title`), with Markdown preview and dark mode.

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```

## Deploy

Static output goes to `dist/`. Deploy to Cloudflare Pages (build command `npm run build`, output directory `dist`), or via CLI:

```
npx wrangler pages deploy dist --project-name=localnotes
```
