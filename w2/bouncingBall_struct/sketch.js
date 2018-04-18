function Ball(_x, _y, _xSpd, _ySpd) {

  this.x = _x;
  this.y = _y;
  this.xspeed = _xSpd;
  this.yspeed = _ySpd;
}

var balls = [];
var gravity;

function setup() {
  createCanvas(500, 500);

  gravity = 1;



  //create 10 balls at the same time
  for (var i = 0; i < 10; i++) {
    //either is ok
    /*_x = 0;
    _y = height / 2;
    _xSpd = random(-5, 5);
    _ySpd = random(-5, 5);*/
    balls.push(new Ball(0,height/2,random(-5,5),random(-5,5)));

  }
}

function draw() {
  background(0, 20);

  for (var i = 0; i < 10; i++) {
    balls[i].x = balls[i].x + balls[i].xspeed;
    balls[i].y = balls[i].y + balls[i].yspeed;

    // this is the best solution to check the edges
    if (balls[i].x < 10) {
      balls[i].xSpd = -balls[i].xSpd;
      balls[i].x = 10;
    } else if (balls[i].x > width - 10) {
      balls[i].xSpd = -balls[i].xSpd;
      balls[i].x = width - 10;

    }

    if (balls[i].y < 10) {

      balls[i].ySpd = -balls[i].ySpd;
      balls[i].y = 10;
    } else if (balls[i].y > height - 10) {

      balls[i].yspeed = -balls[i].yspeed;
      balls[i].y = height - 10;
    }

    //apply the gravity
    balls[i].yspeed += gravity;

    noStroke();
    fill(255);
    ellipse(balls[i].x, balls[i].y, 20, 20);
  }
}