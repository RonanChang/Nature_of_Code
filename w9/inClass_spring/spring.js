"use strict";

class Spring {
  constructor(ballA, ballB, len) {
    this.ballA = ballA;
    this.ballB = ballB;
    this.len = len;
    this.k = 0.1;
  }

  update() {
    var dir = p5.Vector.sub(this.ballB.pos, this.ballA.pos);
    var distance = dir.mag();
    var stretch = distance - this.len;

    //hooke's law
    //magnitude = -1 * k * stretch
    //B - A, we got a vector from A pointing to B;

    var magnitude = -1 * this.k * stretch;

    var force = dir.copy();
    force.normalize();
    force.mult(magnitude);
    this.ballB.applyForce(force);

    var force = dir.copy();
    force.normalize();
    force.mult(magnitude);
    force.mult(-1);
    this.ballA.applyForce(force);
  }


  display() {
    push();
    stroke(255);
    line(this.ballA.pos.x, this.ballA.pos.y, this.ballB.pos.x, this.ballB.pos.y);

    pop();
  }
}