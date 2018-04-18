var ball;

function setup() {
  createCanvas(500, 500);
  ball = new Ball();

}

function draw() {
  background(100);


  var gravity = createVector(0, 0.5);
  gravity.mult(ball.mass);
  ball.applyForce(gravity);

  ball.move();
  ball.edges();
  ball.display();

}

function mousePressed() {

  var wind = createVector(4, 0);
  ball.applyForce(wind);
}

function Ball() {

  this.location = createVector(width / 2, height / 2);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.mass = 2;
  this.f = createVector(0, 0);

  this.move = function() {

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(10);

  }

  // we don't need to put "var force" here
  this.applyForce = function(force) {

    f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);

  }

  this.edges = function() {

    if (this.location.x < 20) {
      this.velocity.x *= -1;
      this.location.x = 20;
    } else if (this.location.x > width - 20) {
      this.velocity.x *= -1;
      this.location.x = width - 20;
    }

    if (this.location.y < 20) {
      this.velocity.y *= -1;
      this.location.y = 20;
    } else if (this.location.y > height - 20) {
      this.velocity.y *= -1;
      this.location.y = height - 20;
    }
  }

  this.display = function() {

    ellipse(this.location.x, this.location.y, 40, 40);

  }

}