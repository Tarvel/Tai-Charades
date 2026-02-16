# 🕹️ Tai's Charades

A retro 8-bit, arcade-style competitive charades web app with CRT effects, pixel-art aesthetics, and multi-group gameplay.

## Features

- **Retro Space Theme** – Pitch-black starfield background with CRT scanline overlay and screen flicker
- **Pixel-Art UI** – Press Start 2P font, chunky 4px borders, neon colors (Cyan, Magenta, Lime, Yellow)
- **Multi-Group Competition** – Support for 2–4 groups with turn-based gameplay
- **Game Master Mode** – One person controls the game, starting/stopping the timer and tapping WIN or FAIL
- **Difficulty Tiers** – Easy (+10 pts), Medium (+25 pts), Hard (+50 pts)
- **5 Themes** – Music, Sports, Places, Movies/TV, Jobs
- **Flexible Stopwatch** – Count-up timer allows the Game Master to control the pace
- **Ranked Standings** – Final screen shows all groups ranked with medals 🏆🥈🥉
- **Smooth Animations** – Framer Motion wobble/float effects on all interactive elements

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **Framer Motion**

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 How to Play

1. **Setup** – Choose the number of groups (2–4), name them, and select the number of rounds
2. **Turn Start** – The current group picks a theme and difficulty.
3. **The Word** – The word appears, but the timer is paused. The participants can get ready.
4. **Action** – The Game Master clicks **START TIMER**. The participants act out the word.
5. **Stop & Score** – The Game Master clicks **STOP TIMER** then taps **WIN** if guessed correctly, or **FAIL**.
6. **Next Group** – Play passes to the next group for their turn
7. **Game Over** – After all rounds, the group with the highest score wins!

## Project Structure

```
├── Charades_Data.json      # Word data (5 themes × 3 difficulties)
├── index.html              # Entry point with Google Fonts
├── src/
│   ├── main.jsx            # React root
│   ├── App.jsx             # Game state manager & routing
│   ├── index.css           # CRT effects, star animations, retro utilities
│   └── components/
│       ├── Background.jsx          # Starfield + CRT overlay
│       ├── StartScreen.jsx         # Title + group setup
│       ├── TurnBanner.jsx          # Scoreboard + turn indicator
│       ├── DifficultySelection.jsx # Gravity well selector
│       ├── GameScreen.jsx          # Word display + timer + WIN/FAIL
│       └── GameOverScreen.jsx      # Final rankings
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```
