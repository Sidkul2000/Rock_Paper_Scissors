# Rock Paper Scissors Simulation

An engaging, visual simulation of the classic rock-paper-scissors game implemented using vanilla JavaScript and HTML5 Canvas. Watch as elements move, interact, and transform following the traditional rules until one type emerges victorious.

## Features

- 🎮 90 interactive elements (30 each of rock, paper, scissors)
- 🌊 Smooth, physics-based movement and collisions
- 🎨 Unique SVG icons and visual effects for each element type
- 📊 Real-time population counters
- 🏆 Dynamic win state detection and celebration
- ⚡ Optimized performance at 60fps

## Technical Implementation

- Vanilla JavaScript for game logic and animations
- HTML5 Canvas for rendering with double buffering
- Custom physics engine for movement and collisions
- SVG-based element visualization
- Responsive canvas sizing

## Game Rules

The simulation follows classic rock-paper-scissors rules:
- Rock crushes scissors
- Scissors cuts paper
- Paper covers rock

When elements collide, the losing element transforms into the winning type. The simulation continues until all elements become the same type.

## Visual Experience

- Distinct colors and shapes for each element type
- Smooth curved movement paths with rotation
- Element transformation animations
- Collision feedback effects
- Victory celebration animations
- Real-time status display

## System Requirements

- Modern web browser with HTML5 Canvas support
- JavaScript enabled
- Recommended: Display capable of 60fps

## How to Run

1. Clone this repository
2. Open `index.html` in a modern web browser
3. Watch the simulation unfold automatically

## Technical Details

The simulation is built with several key components:

- `game.js` - Core game loop and state management
- `element.js` - Element class hierarchy and interaction rules
- `vector2d.js` - Vector mathematics for movement and physics
- `main.js` - Application entry point and setup

Performance is optimized through:
- Double buffered canvas rendering
- Optimized collision detection
- Frame rate management
- Efficient state updates

## License

MIT License