"use strict";
var pendulums = [];
var time = 0.0;
var pendulumCount = 20;
var syncFactor = 25; //the higher it is, the more time it takes to move together again.
var length = 450;

function setup() {
  createCanvas(800, 600);

  for (var i = 0; i < pendulumCount; i++) {
    var ratio = syncFactor / (syncFactor + i);
    pendulums[i] = new Pendulum(width / 2, 0, ratio * ratio * length, 0.15 * PI);
  }
}

function draw() {
  background(0);

  for (var i = 0; i < pendulums.length; i++) {
    pendulums[i].display(time);
    time += 0.05;
  }
}

class Pendulum {
  constructor(x, y, string, angle) {
    this.pos = createVector(x, y);
    this.bottomPos = createVector();
    this.string = string;
    this.angle = angle;
    this.gravity = 1;
  }

  display(time) {
    var theta = this.angle * cos(sqrt(this.gravity / this.string) * time);
    this.bottomPos.x = this.pos.x + this.string * sin(theta);
    this.bottomPos.y = this.pos.y + this.string * cos(theta);

    stroke(255);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.bottomPos.x, this.bottomPos.y);
    fill(255, 255, 0);
    stroke(0);
    ellipse(this.bottomPos.x, this.bottomPos.y, 40, 40);

  }
}