class Bird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this. vy = 0;   // velocity y - determines vertical speed (how fast it falls and moves up)
        this.width = 20;
        this.height = 20;
        this.weight = 1;    // the force constantly pulling the player bird down
    }

    // calculate position and speed of player bid for each frame of animation
    update() {
        let curve = Math.sin(angle) * 20;
        // implement restrictions to ensure the player stays within the canvas
        if (this.y > canvas.height - (this.height * 3) + curve) {
            this.y = canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        } 
        else {
            // this makes the player fall down - the longer it falls; the faster it falls
            this.vy += this.weight;
            this.vy *= 0.9      // to make the speed more manageable
            this.y += this.vy;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 2) this.flap();
    }

    // safeguards to ensure the player can't leave the screen
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    flap() {
        // each time the spacebar is pressed, velocity y will decrease by 2, giving the player a push upwards
        this.vy -= 2;
    }
}

// create an instance of the bird class
const bird = new Bird();