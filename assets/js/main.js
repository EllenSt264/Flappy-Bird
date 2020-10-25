const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 60;
canvas.height = 400;

// flips between true and false whenever spacebar is pressed
let spacePressed = false;
// uses the math dot side method to make our bird move up and down slightly when idle
let angle = 0
// helps cycle through rgb color spectrum
let hue = 0;
// keeps track of frame count of the animation loop so we can add periodic trigger to our game
// will mainly be used to set interval in which obstacles appear
let frame = 0;
let score = 0;
// can use gamespeed to move obstacles, particles and background at the same speed
// or add multipliers to create parallax effect 
// with parallax everything moves at a slightly different speed but relative to each other
let gamespeed = 2;

