# 📅 Interactive Wall Calendar

A polished, animated React calendar component inspired by physical wall calendars. Built for a Frontend Engineering Challenge.

---

## ✨ Features

### Core Requirements
- **Wall Calendar Aesthetic** — Spiral rings, hero landscape image per month, paper texture, page-curl corner effect
- **Day Range Selector** — Click start + end date with visual states: start (red circle), end (blue circle), in-range (highlighted), hover preview
- **Integrated Notes** — Per-range and per-month notes with localStorage persistence, tag system, lined-paper textarea
- **Fully Responsive** — Side-by-side desktop layout, stacked mobile layout, touch-friendly

### Extra Features
- **4 App Themes** — Paper (light), Night, Forest, Ocean — persisted to localStorage
- **Page-flip animation** — Hero image flips when navigating months
- **Staggered cell animations** — Calendar days animate in on mount/month change
- **Holiday markers** — US holidays shown as dots with a dropdown list
- **Ambient background orbs** — Floating gradient blobs behind the calendar
- **Spiral ring animation** — Top rings bounce gently with staggered delays
- **Month-aware accent color** — Each month has a unique color theme (accent, background)
- **Hover range preview** — Shows which days would be selected before clicking
- **Today indicator** — Pulsing ring around today's date
- **Tag system** — Add/remove hashtags to any note
- **Logo animation** — Rotating diamond logo mark

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone <your-repo-url>
cd interactive-wall-calendar

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🏗 Architecture

```
src/
├── App.js                   # Root with theme state, background orbs, header/footer
├── App.css                  # App-level styles, orb animations, theme variants
├── index.js                 # React entry point
├── index.css                # Global CSS variables, keyframe animations
├── calendarData.js          # Pure helpers: date math, month images, holidays, themes
└── components/
    ├── Calendar.js          # Main calendar shell: nav, body layout, range state
    ├── Calendar.css         # Calendar card, nav bar, responsive grid
    ├── CalendarGrid.js      # 7×6 day grid with range logic, hover preview
    ├── CalendarGrid.css     # Cell styles, range fill, today ring, stagger animation
    ├── HeroImage.js         # Monthly hero image with spiral rings and flip animation
    ├── HeroImage.css        # Image reveal, ring bounce, page-curl corner
    ├── Notes.js             # Notes textarea with tabs (range/month), tags, localStorage
    ├── Notes.css            # Lined-paper effect, tag pills, range info bar
    ├── ThemeSwitcher.js     # 4-theme picker buttons
    └── ThemeSwitcher.css    # Theme button styles
```

### Key Design Decisions

| Decision | Reason |
|---|---|
| CSS Variables throughout | Enables runtime theme switching without re-renders |
| `localStorage` for notes & tags | No backend needed; persists between sessions |
| Unsplash images via URL | No bundling of large assets; each month gets a unique landscape |
| Pure date math (no date library) | Keeps bundle size minimal |
| CSS animations over JS | Better performance; GPU-accelerated transforms |
| `aspect-ratio: 1` for day cells | Ensures square cells at any width without JS |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Display font | Playfair Display (serif) |
| Body font | DM Sans (sans-serif) |
| Mono font | Space Mono |
| Primary accent | `#c1440e` (ember red) |
| Secondary accent | `#1a6b8a` (ocean blue) |
| Tertiary accent | `#8b6914` (gold) |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 768px` | Side-by-side: hero image left, calendar grid right |
| `≤ 768px` | Stacked: hero image top, calendar grid below |
| `≤ 480px` | Compact padding, smaller typography |

---

## 🔮 Possible Extensions

- Drag-to-select date ranges
- Multiple saved ranges with color labels
- iCal/Google Calendar export
- Custom hero image upload per month
- Recurring event markers
- Week numbers in the grid
