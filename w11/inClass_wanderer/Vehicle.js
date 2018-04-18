"use strict";

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 1);
    this.acc = createVector();
    this.angle = 0;

    this.maxDesiredVel = 1;
    this.maxSteerForce = 0.05;
    
    //to detect
    this.detectVector = createVector();
    this.predictDistance = 40;
    this.directionVector = createVector();
    this.detectRadius = 100;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }

  detect(target) {
    
    this.detectVector = p5.Vector.mult(this.vel.copy().normalize(), this.predictDistance);
    var centerPos = p5.Vector.add(this.pos,this.detectVector);
    this.directionVector = p5.Vector.sub(target,centerPos);
    
    if(this.directionVector.mag() < this.detectRadius){
      this.directionVector.setMag(this.detectRadius);
    }
    var newTarget = p5.Vector.add(this.directionVector,centerPos);
    //newTarget.mult(-1);//try to avoid
    this.seek(newTarget);
  }
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxDesiredVel);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);
    this.applyForce(steer);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  checkEdges() {
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
  display() {
    push();
    translate(this.pos.x, this.pos.y);

    push();
    rotate(this.angle);
    noStroke();
    fill(255);
    triangle(0, 0, -20, 8, -20, -8);
    pop();
    
    //detecting
    noFill();
    stroke(255,0,0);
    line(0,0,this.detectVector.x,this.detectVector.y);
    ellipse(0,0,this.detectRadius*2);
    
    stroke(255,255,0);
    line(this.detectVector.x,this.detectVector.y,this.directionVector.x,this.directionVector.y);
    pop();
  }
}