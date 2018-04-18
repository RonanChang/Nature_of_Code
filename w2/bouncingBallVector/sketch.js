var ball;

function setup() {
  createCanvas(600, 600);
  ball = new Ball();
}

function draw() {
  background(175);
  ball.move();
  ball.edges();
  ball.display();
}

function Ball() {

  var location = createVector(width / 2, height / 2);
  var velocity = createVector(random(5),random(5));

  this.move = function() {

    location.add(velocity);
  }

  this.edges = function() {

    if (location.x < 20) {
      velocity.x = -velocity.x;
      location.x = 20;

    } else if (location.x > width - 20) {

      velocity.x = -velocity.x;
      location.x = width - 20;

    }

    if (location.y < 20) {
      velocity.y = -velocity.y;
      location.y = 20;

    } else if (location.y > width - 20) {

      velocity.y = -velocity.y;
      location.y = width - 20;

    }
  }

  this.display = function() {

    ellipse(location.x, location.y, 40, 40);
  }
}