"use strict";

var ball;

function setup() {
  createCanvas(800, 600);
  colorMode(HSL);

  ball = new Ball(random(width), 20, false);
}

function draw() {
  background(0, 0, 0);

  fill(240, 100, 50)
  rect(0, height / 2, width, height / 2);
  var gravity = createVector(0, 0.5);
  var friction = ball.vel.copy();
  //friction.mult(-1.3);

  ball.applyForce(gravity);

  if (ball.loc.y >= height / 2) {
    ball.applyForce(friction);
    //ball.isTouched = true;
  }

  ball.update();
  ball.display();
}

class Ball {
  constructor(_x, _y, touching) {
    this.loc = createVector(_x, _y);
    this.vel = createVector();
    this.acc = createVector(0, 0);
    this.isTouched = touching;
    

  }

  update() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);


    /*if (this.isTouched) {
      if (this.vel.y = 0) {
        //this.isTouched = true;
        this.velocity = (0, 0);
        this.edges();
      }
    }*/
  }

  edges() {
    if (this.loc.y > height + 20) {
      this.loc.y = height + 20;
    }

  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  display() {
    push();
    fill(0, 0, 100);
    ellipse(this.loc.x, this.loc.y, 40, 40);
    pop();
  }
}