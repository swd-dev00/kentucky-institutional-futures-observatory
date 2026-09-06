# Kentucky Institutional Futures Observatory

Public editorial frontend for KIFO. The site presents the Observatory’s research position, analytical lenses, instrument register, regional context, methodology, and browser-local concern-draft workflow.

## Repository boundary

This repository contains the public presentation layer only. It does not store concern records, review-queue rows, source candidates, private operator notes, or unpublished evidence.

The private full-stack data and operator foundation lives in [`swd-dev00/kifo-institutional-intelligence`](https://github.com/swd-dev00/kifo-institutional-intelligence). Public publication must remain limited to reviewed, provenance-preserving records exposed through that private application’s public data contract.

## Run locally

This is a dependency-free static frontend:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Design contract

- Institutional/editorial, not cyber-intelligence or command-center styling.
- Cream paper, dark green structure, rust public-action accent, blue regional/infrastructure accent.
- Serif editorial display, sans body copy, mono field-register metadata.
- Territorial canvas is illustrative and decorative; it is not a geographic dataset.
- Concern drafts never leave the browser.
