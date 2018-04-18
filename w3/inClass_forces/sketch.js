"use strict";
var c;

function setup() {
  createCanvas(800, 600);
  c = new Circle(width / 2, height / 2);
}

function draw() {
  background(0);
  var angle = c.vel.heading();
  print(angle);

  //var gravity = createVector(0, 0.3);
  
  if (keyIsPressed) {
    
  var force = createVector();
    if (keyCode == LEFT_ARROW) {
      force = p5.Vector.fromAngle(angle - PI / 2);
    } else if (keyCode == RIGHT_ARROW) {
      force = p5.Vector.fromAngle(angle + PI / 2);
    }
    force.mult(0.1);
    c.applyForce(force);
  }
  c.update();
  c.edges();
  c.display();
}

class Circle {

  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.r = 20;
  }

  update() {

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }
  edges() {
    if (this.pos.x < 20) {
      this.vel.x *= -1;
      this.pos.x = 20;
    } else if (this.pos.x > width - 20) {
      this.vel.x *= -1;
      this.pos.x = width - 20;
    }

    if (this.pos.y < 20) {
      this.vel.y *= -1;
      this.pos.y = 20;
    } else if (this.pos.y > height - 20) {
      this.vel.y *= -1;
      this.pos.y = height - 20;
    }

  }

  applyForce(force) {
    this.acc.add(force);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, 2 * this.r);
    pop();
    
    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(2);
    stroke(255, 0, 0);
    line(0, 0, this.vel.x * 20, this.vel.y * 20);
    pop();
  }
}