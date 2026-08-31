# P2WLAN Web V3 Validation Report

Validated on 2026-08-31 from a clean copy without `.cache/`, `dist/` or `node_modules/`.

## Build and integrity

```text
npm ci --ignore-scripts
up to date, audited 1 package
0 vulnerabilities

npm run check
content validation passed: 15 docs, 8 fallback assets
built 19 pages for v0.1.146
wrote release-data.json for v0.1.146
dist validation passed: 20 HTML files
release data validation passed: v0.1.146, 8 assets
```

The generated site contains:

- 1 product home page
- 1 download page
- 1 documentation hub
- 15 independent documentation pages
- 1 changelog page
- 1 generated 404 page
- search index, sitemap, build metadata and public release metadata

## Semantic and accessibility gates

The permanent distribution validator checks:

- exactly one `h1` per HTML page
- `zh-CN`, viewport and canonical metadata
- unique element IDs
- alternative text on every image
- accessible names for links and buttons
- skip navigation links
- resolved template tokens
- valid internal URLs and generated assets
- CSS, JavaScript and Open Graph image size budgets

## Interaction QA

A browser DOM smoke suite passed 21 checks covering:

- Light / Dark theme switching
- document search and results
- platform detection and recommended download
- Release asset rendering
- mobile navigation
- documentation sidebar and in-page TOC
- code copy controls
- reading progress
- odd documentation group grid handling
- desktop and 390px horizontal overflow

## Visual QA matrix

Rendered and reviewed:

- Home: 1440px Light, 1440px Dark, 390px Light
- Download: 1440px and 390px
- Documentation hub: 1440px and 390px
- Getting started article: 1440px
- Changelog: 1440px

Final corrections made during visual QA:

- constrained the hero headline to an intentional two-line composition
- removed the isolated final Chinese character in the self-hosting headline
- made the fifth documentation group span the full desktop grid
- reset the same group to one column on mobile
- verified no horizontal overflow at 1440px and 390px

## Static footprint

```text
Merged CSS: 64,539 bytes
Client JavaScript: 14,122 bytes
Home HTML: 21,079 bytes
Third-party runtime dependencies: 0
```
