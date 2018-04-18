"use strict";
class Ball {

  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = random(2, 4);
    this.size = this.mass * 10;
  }

  update() {

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }
  
  applyForce(force){
    var f = p5.Vector.div(force,this.mass);
    this.acc.add(f);
    
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, this.size);
    pop();

  }


}