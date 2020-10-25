const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;


let spacePressed = false;   // flips between true and false whenever spacebar is pressed
let angle = 0               // uses the math dot side method to make our bird move up and down slightly when idle
let hue = 0;         // helps cycle through rgb color spectrum
let frame = 0;      // frame keeps track of frame count of the animation loop so we can add periodic trigger to our game, will mainly be used to set interval in which obstacles appear
let score = 0;
/* We can use gamespeed to move obstacles, particles and background at the same speed
or add multipliers to create parallax effect 
with parallax everything moves at a slightly different speed but relative to each other */
let gamespeed = 2;


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10, 10, 50, 50);    // draws a rectangle that will represent our player, for now, at coordinates 10 10 and width/height of 50
    handleObstacles();
    bird.update();
    bird.draw();
    handleCollisions();
    if (handleCollisions()) return;     // if handleCollisions is true which will prevent the animate function from calling the next requestAnimationFrame; animation loop will stop
    handleParticles();
    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame++;    // increase framecount by 1 for every animation loop cycle
}

animate();

window.addEventListener("keydown", function(e) {
    if (e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function(e) {
    if (e.code === "Space") spacePressed = false;
});

// collision

const bang = new Image();
bang.src = "../assets/img/bang.png"

function handleCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (
            bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
                bird.y + bird.height < canvas.height))
                ) {

                // COLLISION DETECTED
                ctx.drawImage(bang, bird.x, bird.y, 50, 50); // draw at x and y coordinates of the bird
                return true;
            }
    }
}