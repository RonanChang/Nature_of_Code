"use strict";
class Circle {

  constructor(_x, _y) {

    this.pos = createVector(_x, _y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = random(30, 50);
  }
  applyForce(force){
    this.acc.add(force);
  }
  update() {

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    push();
 
    fill(255);
    //translate(this.pos.x, this.pos.y);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    pop();
  }
}

var circle;
var f;
function setup() {
  createCanvas(500, 600);
  circle = new Circle(random(width), height/2);
  f = createVector(0,4);
}

function draw() {
  background(0);
 
  circle.update();
  circle.display();
}

function keyPressed(){
  
  circle.applyForce(f);
}