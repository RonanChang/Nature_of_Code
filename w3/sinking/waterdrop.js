"use strict";

class Waterdrop{
  
  constructor(_x,_y){
    this.loc = createVector(_x,_y);
    this.vel = createVector();
    this.acc = createVector();
  }
  
  update(){
    
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }
  
  applyForce(force){
    this.acc.add(force);
  }
  
  display(){
    push();
    translate(this.loc.x,this.loc.y);
    noStroke();
    ellipse(0,0,20,20);
    pop();
  }
}