var x = [];
var y = [];
var xspeed = [];
var yspeed = [];
var gravity;

function setup() {
  createCanvas(500, 500);

  //create 10 balls at the same time
  for (var i = 0; i < 10; i++) {
    x[i] = 25;
    y[i] = height / 2;
    gravity = 1;
    xspeed[i] = random(-5, 5);
    yspeed[i] = random(-5, 5);
  }
}

function draw() {
  background(0, 20);
  for (var i = 0; i < 10; i++) {
    x[i] = x[i] + xspeed[i];
    y[i] = y[i] + yspeed[i];

    // this is the best solution to check the edges
    if (x[i] < 10) {
      xspeed[i] = -xspeed[i];
      x[i] = 10;
    } else if (x[i] > width - 10) {
      xspeed[i] = -xspeed[i];
      x[i] = width - 10;

    }

    if (y[i] < 10) {

      yspeed[i] = -yspeed[i];
      y[i] = 10;
    } else if (y[i] > height - 10) {

      yspeed[i] = -yspeed[i];
      y[i] = height - 10;
    }

    //apply the gravity
    yspeed[i] += gravity;

    noStroke();
    ellipse(x[i], y[i], 20, 20);
  }
}