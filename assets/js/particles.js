const particlesArray = [];

class Particle {
    constructor() {
        this.x = bird.x;     // particles should always start at where the bird is
        this.y = bird.y;
        this.size = Math.random() * 7 + 3;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = "hsla(" + hue + ",100%, 50%, 0.8)";    // use concatenated HSLA string to allow the color to change
    }

    update() {
        this.x -= gamespeed;    // particles will move to the left as the game scrolls by
        this.y += this.speedY;  // makes it move up and down slightly
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();       // to start drawing
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);     // arc method to draw a circle
        ctx.fill();
    }
}

function handleParticles() {
    particlesArray.unshift(new Particle);  // this takes whatever we pass through it as an attribute and adds it as a new item to the start of an array
    // for loop to cycle through particles array
    for (i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    // Don't want the particles to draw endlessly - this would cause performance issues
    // If more than 200, remove 20
    if (particlesArray.length > 200) {
        for (let i = 0; i < 20; i++) {
            particlesArray.pop(particlesArray[i]);
        }
    }
}

