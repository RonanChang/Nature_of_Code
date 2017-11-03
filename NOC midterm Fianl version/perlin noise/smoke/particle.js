"use strict";

class Particle {
  constructor(x,y) {
    this.pos = createVector(x, y);
    this.initPos = createVector(x, y);
    this.vel = createVector(0,0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.h = 0;
    //this.a = 255;
    this.prevPos = this.pos.copy();
    this.lifespan = 255;
    this.life_decrease = random(1,4);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    this.lifespan -= this.life_decrease;
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
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var f = vectors[index];


    stroke(this.h, 200, 255,this.lifespan);

    // this.a -=1;
    // if(this.a < 0){
    //   this.a = 255;
    // }
    
    strokeWeight(2);
    //point(this.pos.x,this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges(newHeight) {

    if (this.pos.x > width && random(1) > 0.75) {
      return true;
    }
    if (this.pos.x < 0 && random(1) > 0.75) {
      return true;
    }
    if (this.pos.y > height && random(1) > 0.75) {
      return true;
    }
    if (this.pos.y < newHeight && random(1) > 0.75) {
      return true;
    }
    
    return false;

  }

}