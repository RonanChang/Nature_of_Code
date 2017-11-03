"use strict";

class Wave {

  constructor(y,h,l,s,b) {

    this.particles = [];
    this.numParticles = 500;

    for (var i = 0; i < this.numParticles; i++) {
      this.particles.push(new Particle(random(width), y,h,l,s,b));
    }
  }

  update() {
    for (var i = 0; i <this. particles.length; i++) {
      var p = this.particles[i];
      p.update();
    }
  }

  follow(vectors) {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      p.follow(vectors);
    }
  }

  edges() {
    for (var i = 0; i <this. particles.length; i++) {
      var p = this.particles[i];
      p.edges();
    }
  }
  display(vectors) {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      p.display(vectors);
    }
  }
}