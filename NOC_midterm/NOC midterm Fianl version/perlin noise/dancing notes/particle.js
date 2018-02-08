"use strict";

class Particle {
  constructor(x, y,h,l,s,b) {
    this.pos = createVector(x, y);
    //this.vel = p5.Vector.random2D();
    this.vel = createVector();
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.h = h;
    this.h_increase = l;
    this.s = s;
    this.b = b;
    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  follow(vectors) {
    var x = floor(this.pos.x / param.scl);
    var y = floor(this.pos.y / param.scl);
    var index = x + y * cols;
    var f = vectors[index];

    this.applyForce(f);
  }

  applyForce(force) {
    this.acc.add(force);
  }


  display(vectors) {
    var x = floor(this.pos.x / param.scl);
    var y = floor(this.pos.y / param.scl);
    var index = x + y * cols;
    var f = vectors[index];

    stroke(this.h,this.s,this.b);


    this.h += this.h_increase;

    if (this.h > 360) {
      this.h -= 360;
    }
    strokeWeight(2);
    //point(this.pos.x,this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }


  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {

    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}