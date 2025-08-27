# Sliding Puzzle Game

A classic 3x3 sliding puzzle game built with HTML, CSS, and JavaScript. The goal is to arrange the numbered tiles in order from 1-8 with the empty space at the bottom right.

## Features

- **Classic 3x3 Sliding Puzzle**: Traditional sliding tile puzzle gameplay
- **Move Counter**: Tracks the number of moves made
- **Timer**: Shows elapsed time during gameplay
- **Smart Shuffling**: Ensures every generated puzzle is solvable
- **Visual Feedback**: Highlights movable tiles and provides smooth animations
- **Responsive Design**: Works on both desktop and mobile devices
- **Win Detection**: Celebratory message when puzzle is completed

## How to Play

1. **Objective**: Arrange the numbers 1-8 in ascending order with the empty space at the bottom right
2. **Movement**: Click on any tile adjacent to the empty space to move it
3. **Strategy**: Plan your moves carefully - each move counts towards your total
4. **Goal**: Complete the puzzle in as few moves as possible

## Game Controls

- **New Game**: Start a fresh puzzle with new tile arrangement
- **Click Tiles**: Move tiles by clicking on them when they're adjacent to the empty space

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript (no external dependencies)
- **Algorithm**: Fisher-Yates shuffle with solvability check
- **Responsive**: CSS Grid layout with mobile-first design
- **Animations**: Smooth transitions and hover effects
- **Cross-browser**: Compatible with all modern browsers

## Files

- `index.html` - Main HTML structure
- `puzzle_game.css` - Styling and responsive design
- `puzzle_game.js` - Game logic and functionality
- `README.md` - This documentation file

## How to Run

1. Download all three files to the same directory
2. Open `index.html` in any modern web browser
3. Start playing immediately - no installation required!

## Game Rules

- Only tiles adjacent to the empty space can be moved
- Diagonal movement is not allowed
- The puzzle is guaranteed to be solvable
- Your goal is to arrange tiles in numerical order: 1, 2, 3, 4, 5, 6, 7, 8, [empty]

## Tips for Success

- Start by moving tiles to their correct positions one by one
- Focus on getting the first row (1, 2, 3) in place first
- Use the empty space strategically to move tiles around
- Don't be afraid to use the "Solve" button to see how it's done!

Enjoy the puzzle! 🧩 
