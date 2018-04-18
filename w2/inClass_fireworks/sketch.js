"use strict";
var circles = [];

function setup() {
  createCanvas(500, 600);
  for (var i = 0; i < 100; i++) {
    circles[i] = new Circle(width / 2, height, -10);
  }
}

function draw() {
  background(0, 15);
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.update();
    c.applyGravity(0.1);
    c.display();
  }
}

function mousePressed() {
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.explode();
  }
}

class Circle {

  constructor(_x, _y, _velY) {
    this.x = _x;
    this.y = _y;
    this.dia = random(5, 10);
    this.velX = 0;
    this.velY = _velY;
    this.isExploded = false;
    this.angle = random(PI * 2);
    this.angleVel = random(0.01, 0.03);
    this.count = 0;
  }
  update() {
    this.x += this.velX;
    this.y += this.velY;
    if (this.isExploded) {
      this.velX *= 0.95;
      this.velY *= 0.95;
      this.count++;
    }
  }
  applyGravity(g) {
    this.velY += g;
  }
  explode() {
    this.isExploded = true;
    this.velX = random(-10, 10);
    this.velY = random(-10, 10);
  }
  display() {
    push();
    blendMode(ADD);
    translate(this.x, this.y);
    rotate(frameCount * this.angleVel + this.angle);
    noStroke();
    fill(200,10,0 ,150);
    ellipse(this.count, 0, this.dia, this.dia);
    pop();

  }

}