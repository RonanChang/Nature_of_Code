"use strict";
var fireworks = [];
var gravity;

function setup() {
  createCanvas(800,600);
  stroke(255);
  strokeWeight(4);
  colorMode(HSL);

  gravity = createVector(0, 0.1);

  fireworks.push(new Firework());
}

function draw() {
  colorMode(RGB);
  background(0, 25);
  if (random(1) < 0.1) {
    fireworks.push(new Firework());
  }

  for (var i = fireworks.length - 1; i >= 0; i--) {
    //var f = fireworks[i];

    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);

    }
  }
}

