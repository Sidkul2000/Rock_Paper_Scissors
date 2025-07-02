/**
 * A 2D vector class for handling position, velocity and other vector operations
 */
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Creates a copy of this vector
     */
    clone() {
        return new Vector2D(this.x, this.y);
    }

    /**
     * Adds another vector to this one
     */
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    /**
     * Subtracts another vector from this one
     */
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    /**
     * Multiplies this vector by a scalar
     */
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divides this vector by a scalar
     */
    divide(scalar) {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }

    /**
     * Calculates the magnitude (length) of this vector
     */
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalizes this vector (makes it unit length)
     */
    normalize() {
        const mag = this.magnitude();
        if (mag !== 0) {
            this.divide(mag);
        }
        return this;
    }

    /**
     * Sets the magnitude of this vector to the specified value
     */
    setMagnitude(value) {
        this.normalize();
        this.multiply(value);
        return this;
    }

    /**
     * Limits the magnitude of this vector to the specified value
     */
    limit(max) {
        if (this.magnitude() > max) {
            this.normalize();
            this.multiply(max);
        }
        return this;
    }

    /**
     * Calculates the distance to another vector
     */
    distance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Sets random x and y components to create a random direction
     */
    random() {
        const angle = Math.random() * Math.PI * 2;
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
        return this;
    }

    /**
     * Creates a random vector with the specified magnitude
     */
    static random(magnitude = 1) {
        const vec = new Vector2D();
        vec.random();
        vec.multiply(magnitude);
        return vec;
    }

    /**
     * Creates a vector from an angle and magnitude
     */
    static fromAngle(angle, magnitude = 1) {
        return new Vector2D(
            Math.cos(angle) * magnitude,
            Math.sin(angle) * magnitude
        );
    }

    /**
     * Linearly interpolates between two vectors
     */
    static lerp(start, end, amount) {
        const x = start.x + (end.x - start.x) * amount;
        const y = start.y + (end.y - start.y) * amount;
        return new Vector2D(x, y);
    }

    /**
     * Returns the angle between this vector and another
     */
    angleBetween(other) {
        return Math.atan2(other.y - this.y, other.x - this.x);
    }
}