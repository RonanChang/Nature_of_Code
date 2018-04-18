"use strict";


//add splice() on your own;

var systems = [];

function setup() {
  createCanvas(500, 600);
}

function draw() {
  background(0);
  for (var i = 0; i < systems.length; i++) {
    systems[i].display();
  }

}

function mousePressed() {
  systems.push(new System(mouseX, mouseY));
}



class Circle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-3, 3), random(-3, 3));
    this.acc = createVector();
    this.isDone = false;
    this.lifespan = 255;
    this.lifeReduction = 1;

  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    // life

    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduction;
    } else {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  applyForce(f) {
    this.acc.add(f);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, this.lifespan);
    ellipse(0, 0, 10, 10);
    pop();
  }
}

class System {
  constructor(x, y) {
    this.particles = [];
    this.origin = createVector(x, y);
    this.scl = random(0.5, 2);
    this.rotSpeed = random(-0.3,0.3);
    this.clr = color(random(255), random(255), random(255));

    for (var i = 0; i < 30; i++) {
      this.particles.push(new Rectangle(0, 0));
      this.particles.push(new Circle(0, 0));
    }
  }


  display() {
    push();
    translate(this.origin.x, this.origin.y);
    scale(this.scl);
    rotate(this.rotSpeed);
    fill(this.clr);
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.update();
      p.display();
      if (p.isDone) {
        this.particles.splice(i, 1);
      }
    }
    pop();
  }
}



class Rectangle extends Circle {
  constructor(x,y) {
   super(x,y);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255,255,0, this.lifespan);
    rectMode(CENTER);
    rect(0, 0, 10, 10);
    pop();
  }
}