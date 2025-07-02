/**
 * Main game class that manages the simulation
 */
class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.elements = [];
        this.isRunning = false;
        this.counters = {
            rock: document.getElementById('rock-counter'),
            paper: document.getElementById('paper-counter'),
            scissors: document.getElementById('scissors-counter')
        };
        this.winnerOverlay = document.getElementById('winner-overlay');
        this.winnerType = document.getElementById('winner-type');
        
        // Bind methods
        this.animate = this.animate.bind(this);
        
        // Initialize canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Resizes canvas to match window size with pixel ratio adjustment
     */
    resizeCanvas() {
        const pixelRatio = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.canvas.width = width * pixelRatio;
        this.canvas.height = height * pixelRatio;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.scale(pixelRatio, pixelRatio);
    }

    /**
     * Creates initial elements
     */
    initialize() {
        const elementRadius = 15;
        const margin = elementRadius * 4;
        const width = this.canvas.width / window.devicePixelRatio;
        const height = this.canvas.height / window.devicePixelRatio;
        
        // Define corner areas
        const corners = {
            topLeft: {
                x: margin,
                y: margin,
                width: width * 0.2,
                height: height * 0.2
            },
            topRight: {
                x: width * 0.8 - margin,
                y: margin,
                width: width * 0.2,
                height: height * 0.2
            },
            bottomLeft: {
                x: margin,
                y: height * 0.8 - margin,
                width: width * 0.2,
                height: height * 0.2
            }
        };

        // Clear existing elements
        this.elements = [];

        // Create elements in corners
        for (let i = 0; i < 30; i++) {
            // Rocks in top left
            const rockArea = corners.topLeft;
            this.elements.push(new Rock(
                Math.random() * rockArea.width + rockArea.x,
                Math.random() * rockArea.height + rockArea.y,
                elementRadius
            ));

            // Papers in top right
            const paperArea = corners.topRight;
            this.elements.push(new Paper(
                Math.random() * paperArea.width + paperArea.x,
                Math.random() * paperArea.height + paperArea.y,
                elementRadius
            ));

            // Scissors in bottom left
            const scissorsArea = corners.bottomLeft;
            this.elements.push(new Scissors(
                Math.random() * scissorsArea.width + scissorsArea.x,
                Math.random() * scissorsArea.height + scissorsArea.y,
                elementRadius
            ));
        }

        this.updateCounters();
    }

    /**
     * Updates element counters in the UI
     */
    updateCounters() {
        const counts = {
            rock: this.elements.filter(e => e instanceof Rock).length,
            paper: this.elements.filter(e => e instanceof Paper).length,
            scissors: this.elements.filter(e => e instanceof Scissors).length
        };

        this.counters.rock.textContent = `Rocks: ${counts.rock}`;
        this.counters.paper.textContent = `Papers: ${counts.paper}`;
        this.counters.scissors.textContent = `Scissors: ${counts.scissors}`;

        // Check for winner
        const types = Object.entries(counts).filter(([_, count]) => count > 0);
        if (types.length === 1) {
            this.declareWinner(types[0][0]);
        }
    }

    /**
     * Displays winner overlay
     */
    declareWinner(type) {
        this.isRunning = false;
        this.winnerType.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        this.winnerOverlay.style.display = 'flex';
    }

    /**
     * Handles collisions between elements
     */
    handleCollisions() {
        for (let i = 0; i < this.elements.length; i++) {
            for (let j = i + 1; j < this.elements.length; j++) {
                const a = this.elements[i];
                const b = this.elements[j];

                if (a.collidesWith(b)) {
                    // Check transformation rules
                    const aTransform = a.getTransformedType(b);
                    const bTransform = b.getTransformedType(a);

                    // Apply transformations
                    if (aTransform) {
                        switch (aTransform) {
                            case 'rock':
                                this.elements[i] = new Rock(a.position.x, a.position.y, a.radius);
                                break;
                            case 'paper':
                                this.elements[i] = new Paper(a.position.x, a.position.y, a.radius);
                                break;
                            case 'scissors':
                                this.elements[i] = new Scissors(a.position.x, a.position.y, a.radius);
                                break;
                        }
                    }
                    if (bTransform) {
                        switch (bTransform) {
                            case 'rock':
                                this.elements[j] = new Rock(b.position.x, b.position.y, b.radius);
                                break;
                            case 'paper':
                                this.elements[j] = new Paper(b.position.x, b.position.y, b.radius);
                                break;
                            case 'scissors':
                                this.elements[j] = new Scissors(b.position.x, b.position.y, b.radius);
                                break;
                        }
                    }

                    if (aTransform || bTransform) {
                        this.updateCounters();
                    }
                }
            }
        }
    }

    /**
     * Main update loop
     */
    update() {
        const width = this.canvas.width / window.devicePixelRatio;
        const height = this.canvas.height / window.devicePixelRatio;

        // Update elements
        this.elements.forEach(element => {
            element.update(width, height);
        });

        // Handle collisions
        this.handleCollisions();
    }

    /**
     * Renders the game
     */
    render() {
        const width = this.canvas.width / window.devicePixelRatio;
        const height = this.canvas.height / window.devicePixelRatio;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Render elements
        this.elements.forEach(element => {
            element.render(this.ctx);
        });
    }

    /**
     * Animation loop
     */
    animate() {
        if (!this.isRunning) return;

        this.update();
        this.render();
        requestAnimationFrame(this.animate);
    }

    /**
     * Starts the game
     */
    start() {
        this.isRunning = true;
        this.animate();
    }

    /**
     * Stops the game
     */
    stop() {
        this.isRunning = false;
    }
}