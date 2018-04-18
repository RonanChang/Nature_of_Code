"use strict";

class Ball {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;
    this.rad = 5 * this.mass
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(0.9);

  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  drag() {
    var distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (mouseIsPressed && distance < this.rad + 50) {
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.rad * 2);
    pop();
  }

}