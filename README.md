# The Session Scryer

A fan-made reference tool for Homestuck classpects and sessions, built on top of *The Classpect Connector*.

Inspired by *Homestuck* by Andrew Hussie.

---

## Most Recent Update

Fresh Blood (10/13/2026)

- Recentered the Blood emblem inside its glyph disc (gash now sits at the disc center)
- HSOD 2026 session: small updates
- New options now unlock here with Connector secret completion!
- Fixed exported session-scene and glyph PNGs to always render at a fixed 1024px wide, independent of device display size
- Fixed jagged class icons on the session grid

Rogue's Gallery (8/24/2026)

- Added the Glyph Gallery to the Scryer -- View a session's members in Glyphic form!
- Added Settings to customize the Scryer experience and appearance
- Overhauled Assets
- New Secrets...?

Prediction Schmonviction (6/27/2026)

- Added Influencers and BC Predictions
- Added sitemap

### Hotfixes

- Hotfix 1 (Planned) -- Day Zero, Merch

### Past Updates

- Initial Release

## What It Does

The **Scryer** gives you a complex breakdown of any generic session into some interpretable statistics and labels.

It is as simple as entering a session in by any of three methods (graph, text parse, raw code), and away you go.

## Code Structure

```plain
/
├── index.html                  # Homepage
├── about.html                  # About page
├── scry.html                   # Main app (entry + inside-session frames)
├── settings.html               # Sitewide settings (Polarity, glyph style, substance)
├── spin.html                   # :3 :3 :3
│
├── components/                 # Shared React components + session data-layer
│
├── fonts/                      # Bundled display fonts (Typostuck, Carima)
│
├── images/
│   ├── aspects/                # Aspect icons (no-bg + with-bg)
│   ├── bg/                     # Interior backdrops (mobile / pc)
│   ├── griddecorators/         # Session-center, lunar-center marks
│   ├── logos/                  # Scryer wordmarks (Regular / Bright / Dark)
│   ├── moons/                  # Prospit / Derse / Dual assets
│   ├── playericons-deco/       # Crowns, chevrons, player pawns
│   ├── rungs-layers/           # Rung-band iconography
│   └── special/                # Symbols (humans / trolls) + one-off art
│
└── snd/                        # UI chimes
```
