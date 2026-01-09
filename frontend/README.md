# Mobile Phone Specs Hub (Frontend)

A lightweight React UI for browsing recent phone posts, searching, and opening individual spec pages.

## Features

- Homepage grid of recent phone posts
- Search with debounced input
  - Client-side filtering for the built-in sample dataset
  - Optional server-side query when a backend is configured
- Phone detail pages with clear sections:
  - Display, Chipset, Camera, Memory & Storage, Battery
- Routing:
  - `/` (home)
  - `/phone/:slug` (details)

## Getting Started

In the `frontend/` directory:

### `npm start`

Runs the app in development mode.  
Open http://localhost:3000 to view it in your browser.

### `npm test`

Runs unit tests.

### `npm run build`

Builds the app for production.

## Backend/API Configuration (optional)

By default, the UI uses a small in-memory sample dataset.

To connect to a backend API, set either of these environment variables:

- `REACT_APP_API_BASE` (preferred)
- `REACT_APP_BACKEND_URL` (fallback)

The app will attempt to call:

- `GET {REACT_APP_API_BASE}/phones` (list)
- `GET {REACT_APP_API_BASE}/phones?search=...` (optional server-side search)
- `GET {REACT_APP_API_BASE}/phones/{slug}` (detail)

If requests fail (or the backend is not configured), it automatically falls back to the sample dataset.

## Styling

This project uses plain CSS (single approach) with a light modern theme:

- Accents: `#3b82f6` and `#06b6d4`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`
