"use strict";

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0.1);
    this.acc = createVector();
    this.dia = 10;
    this.mass = random(2, 5);
    
    this.lifespan = 1.0;
    this.lifeDecrease = random(0.005,0.01);
    this.isDead = false;

  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= this.lifeDecrease;
    
    if(this.lifespan < 0){
      this.lifespan = 0;
      this.isDead = true;
    }
    
    this.dia = map(this.lifespan,0.0,1.0,0,10);

  }
  applyForce(force) {
    force.div(this.mass);
    this.acc.add(force);
  }
  checkEdges() {

    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -1;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1;
    }

    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
      // return true;
    } else if (this.pos.x > width) {
      this.pos.x = width;
       this.vel.x *= -1;
      // return true;
    }

  }
  
  

  debugDisplay() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    ellipse(0, 0, this.dia * this.mass);
    stroke(255, 0, 0);
    line(0, 0, this.vel.x * 2, this.vel.y * 2);
    pop();
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(255);
    ellipse(0, 0, this.dia * this.mass);
    pop();
  }
}