"use strict";
var p;
function setup() {
  createCanvas(500, 600);
  p = new shape(random(width),random(height));
  
}

function draw() {
  background(0);
  
  var pos=  createVector(mouseX,mouseY);
  p.applyAttraction(pos);
  p.update();
  p.display();
  

}

class shape {
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.vel = createVector(random(-3,3),random(-3,3));
    this.acc = createVector();
    this.angle  = 0;
    
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    //this.angle = this.vel.heading();
    this.angle = atan2(this.vel.y,this.vel.x);//the result is the same.
    this.vel.mult(0);
  }
  applyForce(force){
    this.acc.add(force);
  }
  applyAttraction(otherPos){
    var vector = p5.Vector.sub(otherPos,this.pos);
    vector.mult(0.1);
    this.applyForce(vector);
  }
  display(){
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.angle);
    triangle(0,0,-50,20,-50,-20);
    pop();
  }
}
