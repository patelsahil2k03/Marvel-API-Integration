# Marvel-API-Integration

Angular 14 app for browsing Marvel characters, comics, and series via Marvel public API.

## Features

- Characters listing with search
- Character-specific comics and series modal views
- Dedicated comics and series pages
- Error and loading state handling
- Environment-driven API auth configuration

## Tech Stack

- Angular 14
- TypeScript (strict)
- RxJS + HttpClient
- Bootstrap 4

## Setup

```bash
npm ci
```

## Configuration

Create credentials in environment files:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Fields:
- `marvel.publicKey`
- `marvel.hash`
- `marvel.ts`

Important: never commit real Marvel credentials.

## Runbook

Start dev server:
```bash
npm start
```

Build:
```bash
npm run build
```

Test:
```bash
npm run test -- --watch=false --browsers=ChromeHeadless
```

## Production Hardening Applied

- Removed hardcoded API keys from source
- Fixed malformed URL construction and centralized request params
- Added typed API models and safer request handling
- Replaced fragile external animation script coupling with Angular-driven state
- Added loading/error UX and empty-state handling
- Added wildcard route fallback and safer navigation semantics
- Stabilized unit tests with HTTP testing module

## License

MIT
