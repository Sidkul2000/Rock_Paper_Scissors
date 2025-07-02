# System Patterns

## Architecture Overview

```mermaid
classDiagram
    class Game {
        -canvas: HTMLCanvasElement
        -context: CanvasRenderingContext2D
        -elements: Element[]
        +initialize()
        +start()
        +update()
        +render()
    }
    
    class Element {
        <<abstract>>
        -position: Vector2D
        -velocity: Vector2D
        -radius: number
        +update()
        +render()
        +collideWith(other: Element)
    }
    
    class Rock {
        +type: "rock"
        +collideWith(other: Element)
    }
    
    class Paper {
        +type: "paper"
        +collideWith(other: Element)
    }
    
    class Scissors {
        +type: "scissors"
        +collideWith(other: Element)
    }
    
    Element <|-- Rock
    Element <|-- Paper
    Element <|-- Scissors
    Game *-- Element
```

## Design Patterns

### Factory Pattern
- ElementFactory for creating Rock, Paper, Scissors instances
- Handles element type transformations during collisions

### Observer Pattern
- Game state changes notify UI updates
- Element count display updates
- Winner announcement system

### Game Loop Pattern
- RequestAnimationFrame for smooth animation
- Update and render cycle separation
- State management and collision detection

## Core Systems

### Movement System
```mermaid
flowchart LR
    Position --> Velocity
    Velocity --> Boundary
    Boundary --> NewPosition
    NewPosition --> Position
```

### Collision System
```mermaid
flowchart TD
    Detection[Collision Detection] --> Resolution[Collision Resolution]
    Resolution --> Transform[Type Transformation]
    Transform --> Update[State Update]
    Update --> UI[UI Update]
```

### Element Interaction Rules
```mermaid
flowchart TD
    Rock -->|Crushes| Scissors
    Scissors -->|Cuts| Paper
    Paper -->|Covers| Rock