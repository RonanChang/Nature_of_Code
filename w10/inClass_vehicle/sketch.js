"use strict";
var v;

function setup() {
  createCanvas(500, 600);
  v = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(0);
  var mouse = createVector(mouseX, mouseY);
  v.seek(mouse);
  v.update();
  v.display();
  
  
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = 0;
    this.maxDedireVel = 5;
    this.maxSteerforce = 0.1;
    this.breakRad = 150;

  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();

  }

  applyForce(force) {
    this.acc.add(force);
  }
  //gravity 

  seek(target) {
    var desireVel = p5.Vector.sub(target, this.pos);
    var distance = desireVel.mag();

    desireVel.normalize();
    if (distance > this.breakRad) {
      desireVel.mult(this.maxDedireVel); //max speed
    } else {
      //slow down
      var mappingMag = map(distance, 0, this.breakRad, 0, this.maxDesiredVel);
      desireVel.mult(mappingMag);
    }


    var steerForce = p5.Vector.sub(desireVel, this.vel);
    steerForce.normalize();
    steerForce.mult(this.maxSteerforce); //maxForce

    this.applyForce(steerForce);
  }

  checkArea() {
    if (this.pos.x < MARGIN) {
      var desireVel = createVector(this.maxDesiredVel, this.vel.y);
    } else if (this.pos.x > width - MARGIN) {
      
    }

  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    noFill();
    stroke(255, 0, 0);
    ellipse(0, 0, this.breakRad);
    fill(255);
    noStroke();
    triangle(0, 0, -20, -8, -20, 8);
    pop();
  }

}