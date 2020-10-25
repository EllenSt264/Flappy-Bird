const obstaclesArray = [];

class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height / 3);
        this.bottom = (Math.random() * canvas.height / 2.5);
        this.x = canvas.width;
        this.width = 80;
        this.color = "hsla(" + hue + ",100%, 50%)";
        this.counted = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
    // will push obstacles to the left because our game is scrolling to the right
    update() {
        this.x -= gamespeed;
        if (!this.counted && this.x < bird.x) {     // this.x < bird.x means we have moved past the obstacle
            score ++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles() {
    // everytime framecount hits a number that is divisible by 50, enter this if statement code block
    // execute this if statement every 50 frames
    if (frame % 200 === 0) {
        obstaclesArray.unshift(new Obstacle);   
    } 
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0]);
    }  
}