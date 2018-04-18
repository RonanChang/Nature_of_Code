"use strict";
var fireworks = [];
var gravity;

function setup() {
  createCanvas(800, 600, WEBGL);
  stroke(255);
  strokeWeight(4);
 


  gravity = createVector(0, 0.1);

  fireworks.push(new Firework());
}

function draw() {
  colorMode(RGB);
  background(0);
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
  console.log(fireworks.length);
}

function Particle(x, y, hue, exploding) {
  this.hue = hue;
  this.loc = createVector(x, y);
  this.lifespan = 255;
  this.exploding = exploding;
  if (this.exploding) {
    this.vel = createVector(0, random(-11, -8));
  } else {
    this.vel = p5.Vector.random3D();
    this.vel.mult(random(1, 6));
  }
  this.acc = createVector(0, 0);

  this.update = function() {
    if (!this.exploding) {
      this.vel.mult(0.85);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
   // this.vel.limit(10);
  }
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    colorMode(HSL);
    if (!this.exploding) {
      strokeWeight(2);
      stroke(this.hue, 100, 50, this.lifespan);
    } else {
      strokeWeight(2);
      stroke(this.hue, 100, 50);
    }
    push();
    translate(this.loc.x,this.loc.y,this.loc.z);
    ellipse(0, 0, 2, 2);
    pop();
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }
}

function Firework() {
  this.hue = random(360);
  this.firework = new Particle(random(width), height, this.hue, true);
  this.exploded = false;
  this.particles = [];

  this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    //we have to add i> or = 0, otherwise the last firework won't explode
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }
  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  this.explode = function() {

    for (var i = 0; i < 100; i++) {
      var p = new Particle(this.firework.loc.x, this.firework.loc.y, this.hue, false);
      this.particles.push(p);
    }
  }

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}