/**
 * Base class for all game elements (Rock, Paper, Scissors)
 */
class Element {
    /**
     * @param {number} x - Initial x position
     * @param {number} y - Initial y position
     * @param {number} radius - Element radius
     */
    constructor(x, y, radius) {
        this.position = new Vector2D(x, y);
        this.velocity = Vector2D.random(2);
        this.radius = radius;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    /**
     * Updates element position and rotation
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     */
    update(width, height) {
        // Update position
        this.position.add(this.velocity);
        
        // Update rotation
        this.rotation += this.rotationSpeed;

        // Bounce off boundaries
        if (this.position.x < this.radius || this.position.x > width - this.radius) {
            this.velocity.x *= -1;
            this.position.x = Math.max(this.radius, Math.min(width - this.radius, this.position.x));
        }
        if (this.position.y < this.radius || this.position.y > height - this.radius) {
            this.velocity.y *= -1;
            this.position.y = Math.max(this.radius, Math.min(height - this.radius, this.position.y));
        }
    }

    /**
     * Checks collision with another element
     * @param {Element} other - Element to check collision with
     * @returns {boolean}
     */
    collidesWith(other) {
        return this.position.distance(other.position) < this.radius + other.radius;
    }

    /**
     * Returns the transformed element type after collision
     * @param {Element} other - Element collided with
     * @returns {string|null} New element type or null if no transformation
     */
    getTransformedType(other) {
        return null; // Implemented by subclasses
    }

    /**
     * Creates a path for the element's SVG shape
     * @param {CanvasRenderingContext2D} ctx
     */
    createPath(ctx) {
        // Implemented by subclasses
    }

    /**
     * Renders the element
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        ctx.save();
        
        // Translate to element position and apply rotation
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

        // Create element path
        ctx.beginPath();
        this.createPath(ctx);
        
        // Fill and stroke
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }
}

/**
 * Rock element
 */
class Rock extends Element {
    constructor(x, y, radius) {
        super(x, y, radius);
        this.fillColor = '#ff6b6b';
        this.strokeColor = '#c0392b';
    }

    createPath(ctx) {
        const points = 8;
        const innerRadius = this.radius * 0.7;
        
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? this.radius : innerRadius;
            const angle = (i * Math.PI) / points;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
    }

    getTransformedType(other) {
        if (other instanceof Scissors) return null;
        if (other instanceof Paper) return 'paper';
        return null;
    }
}

/**
 * Paper element
 */
class Paper extends Element {
    constructor(x, y, radius) {
        super(x, y, radius);
        this.fillColor = '#4ecdc4';
        this.strokeColor = '#2ecc71';
    }

    createPath(ctx) {
        const size = this.radius * 1.8;
        ctx.rect(-size/2, -size/2, size, size);
    }

    getTransformedType(other) {
        if (other instanceof Rock) return null;
        if (other instanceof Scissors) return 'scissors';
        return null;
    }
}

/**
 * Scissors element
 */
class Scissors extends Element {
    constructor(x, y, radius) {
        super(x, y, radius);
        this.fillColor = '#95a5a6';
        this.strokeColor = '#7f8c8d';
    }

    createPath(ctx) {
        const size = this.radius * 1.8;
        
        // Draw triangle
        ctx.moveTo(-size/2, size/2);
        ctx.lineTo(0, -size/2);
        ctx.lineTo(size/2, size/2);
        ctx.closePath();
    }

    getTransformedType(other) {
        if (other instanceof Paper) return null;
        if (other instanceof Rock) return 'rock';
        return null;
    }
}