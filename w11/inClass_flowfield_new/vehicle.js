"use strict";

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = 0;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
    this.maxVel = 5;
    this.maxForce = 0.1;
  }

  edges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  applyForce(f) {
    this.acc.add(f);
  }

  seek(target) {
    var desiredVel = p5.Vector.sub(target, this.pos);
    desiredVel.normalize();
    desiredVel.mult(this.maxVel);

    var steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxForce);

    this.applyForce(steerForce);

  }

  flow(angle) {
    var desiredVel = p5.Vector.fromAngle(angle);
    //desiredVel.normalize();
    desiredVel.mult(this.maxVel);

    var steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxForce);
    this.applyForce(steerForce);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(0);
    triangle(0, 0, -20, 8, -20, -8);
    pop();
  }
}