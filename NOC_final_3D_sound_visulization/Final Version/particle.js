"use strict";

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    //this.vel = p5.Vector.random2D();
    this.vel = createVector();
    this.acc = createVector(0, 0);
    this.maxspeed = 0.01;
    this.h = 0;
    this.h_increase = 16;
    this.s = 75;
    this.b = 50;
    this.prevPos = this.pos.copy();
    this.neighborDistance = 40;
    this.shine = false;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }

  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var f = vectors[index];

    this.applyForce(f);
  }

  applyForce(force) {
    this.acc.add(force);
  }


  display(vectors) {

    var coords = [];
    var percentdone = (degrees(frameCount / 500) / 360) % 1;
    if (percentdone < 0.25) {
      coords = blendPoint(spherical(this.pos.x, this.pos.y),
        spherical2(this.pos.x, this.pos.y), 1 - map(percentdone, 0, 0.25, 0, 1),
        map(percentdone, 0, 0.25, 0, 1));
    } else if (percentdone < 0.5) {
      coords = blendPoint(spherical2(this.pos.x, this.pos.y),
        donut2(this.pos.x, this.pos.y), 1 - map(percentdone, 0.25, 0.5, 0, 1),
        map(percentdone, 0.25, 0.5, 0, 1));
    } else if (percentdone < 0.75) {
      coords = blendPoint(donut2(this.pos.x, this.pos.y),
        spherical2(this.pos.x, this.pos.y), 1 - map(percentdone, 0.5, 0.75, 0, 1),
        map(percentdone, 0.5, 0.75, 0, 1));
    } else {
      coords = blendPoint(spherical2(this.pos.x, this.pos.y),
        spherical(this.pos.x, this.pos.y), 1 - map(percentdone, 0.75, 1, 0, 1),
        map(percentdone, 0.75, 1, 0, 1));
    }

    push();
    translate(coords[0], coords[1], coords[2]);
    sphere(1);
    if (this.addColor&&this.shine) {
      fill(this.h, this.s, lightRange);
    } else if(this.addColor) {
      fill(this.h,this.s,this.b);
    }else{
      fill(0,0,100);
    }


    this.h += this.h_increase;
    if (this.h > 360) {
      this.h -= 360;
    }
    pop();

  }



  addDonut() {

    var coords2 = donut(this.pos.x, this.pos.y);
    push();
    if (this.addColor&&this.shine) {
      fill(this.h, this.s, lightRange);
    } else if(this.addColor) {
      fill(this.h,this.s,this.b);
    }else{
      fill(0,0,100);
    }

    this.h += this.h_increase;
    if (this.h > 360) {
      this.h -= 360;
    }
    translate(coords2[0], coords2[1], coords2[2]);
    sphere(1);
    pop();
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
