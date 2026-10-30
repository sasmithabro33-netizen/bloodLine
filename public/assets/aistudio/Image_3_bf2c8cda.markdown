---
name: Bloodreign Competitive HUD
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#e9bcb7'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#af8783'
  outline-variant: '#5f3f3b'
  surface-tint: '#ffb4ab'
  primary: '#ffb4ab'
  on-primary: '#690006'
  primary-container: '#ff544b'
  on-primary-container: '#5c0005'
  inverse-primary: '#c00014'
  secondary: '#f2be71'
  on-secondary: '#442b00'
  secondary-container: '#684400'
  on-secondary-container: '#e6b367'
  tertiary: '#ffb3ae'
  on-tertiary: '#68000c'
  tertiary-container: '#f35f5c'
  on-tertiary-container: '#5c0009'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000c'
  secondary-fixed: '#ffddb1'
  secondary-fixed-dim: '#f2be71'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#614000'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#8d131b'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xxl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-xxl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Chivo
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Chivo
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Chivo
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-tactical:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.12em
  label-stat:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0.15em
spacing:
  gutter: 1.25rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the intensity, precision, and relentless aggression of elite mobile battle royale competition. Built for a premier South Asian Free Fire roster, the aesthetic balances modern tactical HUD geometry with visceral competitive energy. 

The visual style is **High-Contrast Tactical / Neo-Brutalist Cyber**:
- **Atmosphere**: Deep, pitch-black battleground voids punctuated by searing crimson energy bursts, stark white mechanical telemetry, and regal brass highlights.
- **Personality**: Lethal, disciplined, apex-level, and proudly anchored in regional identity.
- **Visual Tropes**: Chamfered angular framing, tactical crosshairs, monospace coordinate labels, high-frequency scanline overlays, dynamic kinetic glow states, and tournament-grade typography.
- **Emotional Intent**: Evokes adrenaline, predatory dominance, razor-sharp focus, and absolute competitive superiority.

## Colors

The palette is engineered specifically for OLED-rich dark rooms and high-stakes match broadcasting:

- **Primary (`#FF1E27` - Apex Crimson)**: Pure kinetic aggression. Used strictly for critical callouts, tournament victory indicators, primary action triggers, health depletion alerts, and dominant team accents.
- **Secondary (`#D4A359` - Heritage Brass / Gold)**: Echoes the Sri Lankan Kastane and royal lion heritage. Deployed exclusively for championship trophies, tier-1 VIP badges, MVP designations, and prestige tier rank indicators.
- **Tertiary (`#7A0010` - Deep Maroon)**: Grounding cultural undertone. Used for secondary active fills, dark weapon tier gradients, and threat perimeter radar tracks.
- **Neutrals**:
  - `Void Onyx` (`#0A0A0C`): Base viewport background.
  - `Carbon Trench` (`#131418`): Layer 1 card and modal backdrops.
  - `Tactical Slate` (`#1B1D24`): Layer 2 interactive surfaces, inputs, and weapon equipment slots.
  - `Stark Signal` (`#FFFFFF`): Primary headline text, critical data readouts, and kill feed tags.
  - `Muted Telemetry` (`#858B9A`): Subtitles, inactive player labels, and timestamp indices.

## Typography

Typography establishes an esports command console atmosphere:
- **Headlines (`Space Grotesk`)**: Technical, mechanical, and uncompromising. Render titles, roster names, and section breaks in all-caps or tight-tracked uppercase where dynamic hierarchy permits.
- **Body & Data (`Chivo`)**: Highly legible, sharp sans-serif engineered for rapid legibility during broadcast streams and real-time tournament statistics.
- **Telemetry & Metadata (`Space Mono`)**: Dedicated to player K/D ratios, ping rates, room IDs, round timers, weapon DPS, and tactical coordinate labels. Always render `label-tactical` and `label-stat` in uppercase.

## Layout & Spacing

The layout is built upon an 8pt tactical micro-grid nested within a responsive 12-column system (4 columns on mobile, 8 on tablet, 12 on desktop):

- **Grid Alignment**: Crisp, dense, structured layout with explicit edge bounds. Avoid loose, sprawling negative space; elements sit compact like modular avionics displays.
- **Breakpoints**:
  - `Mobile` (< 768px): Strict 4-column layout, compact margins (`1rem`), dense weapon and player stat rows.
  - `Tablet` (768px - 1024px): 8-column layout, modular match scoreboards with side telemetry.
  - `Desktop / Broadcast HUD` (> 1024px): 12-column layout with 48px canvas margin, allowing dual telemetry panels, live mini-maps, and live match kill feeds to sit concurrently without horizontal scroll.

## Elevation & Depth

Visual hierarchy uses physical carbon shielding, optical laser strokes, and selective ambient backlighting:

- **Level 0 (Floor)**: `#0A0A0C` flat field, punctuated by a 5% opacity dot-matrix grid or 45-degree tactical hazard hatch lines.
- **Level 1 (Panels & Cards)**: `#131418` fill framed with a 1px solid stroke of `#1B1D24`. On hover or critical state, the border shifts to `#FF1E27` with an exterior drop shadow of `0 0 16px rgba(255, 30, 39, 0.35)`.
- **Level 2 (Active Floating Modules & Modals)**: `#1B1D24` base with 1px semi-opaque `#D4A359` borders for championship/leaderboard elements, accompanied by `0 8px 32px rgba(0, 0, 0, 0.8)`.
- **Laser Bevels**: Top borders of key operational cards feature an absolute-positioned 2px horizontal highlight line in `#FF1E27` fading to transparent on the trailing edge.

## Shapes

The design system embraces a **Strict Zero-Radius (Sharp)** and **Chamfered Polygon** architectural approach:

- **Fillets**: No rounded curves. All corner radiuses are locked at `0px`.
- **Tactile Cut Corners**: Cards, tactical chips, and primary CTAs use a 45-degree chamfered edge (`clip-path: polygon(...)`) on either the top-right or bottom-left corner (size: `8px` to `12px`).
- **Accents**: 2px x 2px square corner ticks and vertical technical bracket notches reinforce the military-grade telemetry feel.

## Components

### Buttons
- **Primary (Battle Ready)**: Background `#FF1E27`, text `#FFFFFF`, uppercase `label-tactical`, chamfered top-right corner. Hover state features an inner `#FFFFFF` flash and outer crimson bloom (`box-shadow: 0 0 20px rgba(255, 30, 39, 0.6)`).
- **Secondary (Heritage Tactical)**: `#131418` fill, 1px `#D4A359` border, gold-toned text, uppercase. Hover shifts background to `#7A0010` with text remaining `#D4A359`.
- **Ghost (Recon)**: Transparent background, 1px `#1B1D24` border, `#858B9A` text. Hover snaps border to `#FFFFFF` and text to `#FFFFFF`.

### Badges & Chips
- Monospaced typography with bracketed decorators (e.g., `[MVP]`, `[MATCH WINNER]`, `[SLOT 04]`).
- Chamfered cut corners with a 1px border. Background fill is a 12% alpha tint of the corresponding border color.

### Match & Roster Cards
- `#131418` background with an asymmetrical crimson accent line running down the left flank (3px width).
- Top bar contains player ignite handles, ping index, and flag/region indicator.
- Core content displays dynamic stats (Kills, Damage, Headshot %, Survival Time) segmented by 1px `#1B1D24` vertical grid lines.

### Inputs & Fields
- Dark inset backgrounds (`#0A0A0C`) with `#1B1D24` borders. 
- Prefix indicators display tactical coordinates or prompt chevrons (`>`).
- On active focus: 1px continuous stroke of `#FF1E27` with zero corner radius, accompanied by an instantaneous high-contrast glow.

### Checkboxes & Selectors
- Rigid square boxes (`16px x 16px`), zero radius. Unchecked: `#131418` with `#1B1D24` border. Checked: solid `#FF1E27` with a centered stark white crosshair icon rather than a traditional tick.

### Live Kill Feed & Match Tickers
- Translucent dark panels (`rgba(10, 10, 12, 0.85)`) framed by a 1px left-hand border colored dynamically: `#FF1E27` for standard eliminations, `#D4A359` for headshots or match-clinching final frags.