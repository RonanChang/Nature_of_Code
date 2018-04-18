"use strict";
var particles = [];
var MAX = 100;

var param = {
  debug: false,
  gravity: 1.0, //data type, initial value
  wind: 0,
  numParticles: 0,
  addParticle: function() {
    particles.push(new Particle(random(width), 0));
    param.numParticles = particles.length;
  }
};
var gui = new dat.gui.GUI();
gui.add(param, 'debug');
gui.add(param, 'gravity', 0, 1.5, 0.1); //object,range,rangeEnd,step
gui.add(param, 'wind', -1.0, 1.0, 0.1);
gui.add(param, 'addParticle');
gui.add(param, 'numParticles').listen();


function setup() {
  createCanvas(500, 600);

  for (var i = 0; i < 5; i++) {

    particles[i] = new Particle(random(width), 0);
    param.numParticles = particles.length;

  }
}

function draw() {
  background(0);

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];

    var gravity = createVector(0, param.gravity * p.mass);
    p.applyForce(gravity);

    var wind = createVector(param.wind, 0);
    p.applyForce(wind);

    p.checkEdges();

    // if (p.checkEdges()) {
    //   particles.splice(i, 1);
    //   param.numParticles = particles.length;
    // }

    p.update();

    if (particles.length > MAX) {
      particles.splice(0, 1);
      param.numParticles = particles.length;

    }

    if (p.isDead) {
      particles.splice(i, 1);
      param.numParticles = particles.length;
    }

    if (param.debug) {
      p.debugDisplay();
      fill(255);
      text(round(frameCount), 25, 25);
    } else {
      p.display()
    };
  }


}