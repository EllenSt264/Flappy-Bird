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

// Score color gradient
const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");



/* Background 

Going to draw two backgrounds right next to eachother with both backgrounds 
moving to the left as the game scrolls to the right
it will then quickly jump back behind the right edge 
so it is ready to slide left again */

const background = new Image();
background.src = "../assets/img/background.png"
const  bg = {
    x1: 0,              // horizontal x-axis position for the first background
    x2: canvas.width,   // horizontal x-axis position for the second background
    y: 0,           // vertical position - we want the background to start from the top edge so Y will always be zero
    width: canvas.width,
    height: canvas.height
}   

function handleBackground() {
    if (bg.x1 <= -bg.width + gamespeed) {
        bg.x1 = bg.width;
    }
    else {
        bg.x1 -= gamespeed;
    }
    if (bg.x2 <= -bg.width + gamespeed) {
        bg.x2 = bg.width;
    }
    else {
        bg.x2 -= gamespeed;
    }
    ctx.drawImage(background, bg.x1, bg.y, bg.width, bg.height);
    ctx.drawImage(background, bg.x2, bg.y, bg.width, bg.height);
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10, 10, 50, 50);    // draws a rectangle that will represent our player, for now, at coordinates 10 10 and width/height of 50
    handleBackground();
    handleObstacles();
    bird.update();
    bird.draw();

    // Score
    ctx.fillStyle = gradient;
    ctx.font = "90px Georgia";
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);

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
                // Gameover text
                ctx.font = "25px Georgia";
                ctx.fillStyle = "black";
                ctx.fillText("Game Over! Your score is " + score, 
                160, canvas.height / 2);    // x position is 60 and y position is in the middle of the canvas
                return true;
            }
    }
}