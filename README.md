# CoveWeave CMS

A lightweight CMS built with:

- Next.js 16
- TypeScript
- Tailwind CSS
- SQLite (better-sqlite3)
- Sharp
- React Dropzone

## Install

```bash
npm install
```

## Initialize Database

```bash
npm run db:init
```

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Upload Directory

```
public/uploads/images
public/uploads/thumbs
```

All uploaded images are automatically converted to WEBP.

A thumbnail is generated automatically.