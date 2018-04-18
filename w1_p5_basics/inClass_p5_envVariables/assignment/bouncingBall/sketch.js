var x;
var y;
var xspeed;
var yspeed;

function setup() {
  createCanvas(500, 500);
  x = 25;
  y = height/2;
  gravity = 1;
  xspeed = random(-5,5);
  yspeed = random(-5,5);
}

function draw() {
  background(0, 20);

  x = x + xspeed;
  y = y + yspeed;

  // this is the best solution to check the edges
  if (x < 10) {
    xspeed = -xspeed;
    x = 10;
  } else if (x > width - 10) {
    xspeed = -xspeed;
    x = width - 10;

  }

  if (y < 10) {

    yspeed = -yspeed;
    y = 10;
  } else if (y > height - 10) {

    yspeed = -yspeed;
    y = height - 10;
  }

  //apply the gravity
  yspeed += gravity;

  noStroke();
  ellipse(x, y, 20, 20);
}