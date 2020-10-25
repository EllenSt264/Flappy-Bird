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
    bird.update();
    bird.draw();
    requestAnimationFrame(animate);
    angle++;
}

animate();

window.addEventListener("keydown", function(e) {
    if (e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function(e) {
    if (e.code === "Space") spacePressed = false;
});