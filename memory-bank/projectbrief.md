# Rock Paper Scissors Simulation

## Project Overview
A JavaScript-based simulation of rock-paper-scissors using animated elements on an HTML canvas. The simulation demonstrates emergent behavior through element interactions following classic rock-paper-scissors rules.

## Core Requirements

### Elements and Counts
- Total of 90 elements:
  - 30 rocks
  - 30 papers
  - 30 scissors
- Total count must remain constant throughout simulation

### Movement and Physics
- Random movement across canvas
- Boundary collision detection (bounce off edges)
- Element-to-element collision detection
- Smooth animation using requestAnimationFrame

### Game Rules
- Standard rock-paper-scissors rules:
  - Rock crushes scissors
  - Scissors cuts paper
  - Paper covers rock
- On collision, losing element transforms into winning type

### Visual Elements
- Distinct colors for each element type
- Distinct shapes for each element type
- Real-time count display for each element type
- Clear winner indication when simulation ends

### Win Condition
- Simulation ends when all elements transform into single type
- Winning type should be prominently displayed

## Technical Constraints
- Implementation in vanilla JavaScript
- HTML5 Canvas for rendering
- Browser-based execution