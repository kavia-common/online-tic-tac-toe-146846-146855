# Dark Professional Theme

This document describes the Dark Professional theme applied to the Tic Tac Toe frontend.

## Overview
- Name: Dark Professional
- Description: Dark background with blue (primary) and amber (secondary) accents, modern minimalist style with subtle gradients, rounded corners, and smooth transitions.

## Tokens (CSS Variables)
Defined in `src/App.css` under `:root`:
- --primary: #2563EB
- --primary-600: #1d4ed8
- --primary-300: #93c5fd
- --secondary: #F59E0B
- --error: #EF4444
- --bg: #111827          (page background)
- --surface: #1f2937     (cards/surfaces)
- --surface-2: #111827   (elevated/hover)
- --text: #F9FAFB        (primary text)
- --muted: rgba(249,250,251,0.7)
- --border: rgba(255,255,255,0.08)
- --ring: rgba(37, 99, 235, 0.45)
- --shadow-soft: 0 10px 25px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.25)
- --radius: 16px
- --radius-sm: 12px
- --cell-size: 108px (responsive down to 92px)

Global color scheme is set to `dark` in `src/index.css`.

## Application
- Backgrounds and surfaces use dark grays, while text uses near-white for contrast.
- Interactive elements (status chip, cells, buttons) use subtle elevation, focus rings, and hover effects with blue/amber accents.
- X mark: primary blue; O mark: amber for quick visual distinction.
- Winning cells receive an amber-tinted elevation.

## Layout and Aesthetic
- Centered container with header, status indicator, board, restart button, and footer, preserving the previous modern layout.
- Subtle gradients and shadows add depth without overwhelming the minimalist design.

## How to Extend
- Prefer using the CSS variables instead of hard-coding colors.
- To adjust the overall darkness, tune `--bg`, `--surface`, and `--border`.
- To tweak interactivity emphasis, adjust `--ring`, `--shadow-soft`, and hover border colors.
- For responsive cell sizing, change `--cell-size` and the media query at 480px.

## Notes
- The app footer text has been updated to indicate the Dark Professional theme.
- No component structure changes were required; styles are globally applied via CSS.
