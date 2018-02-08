"use strict";

class Wave {
  constructor(amp) {
    this.particles = [];
    this.numParticles = 500;
    for (var i = 0; i < this.numParticles; i++) {
      // var particle = new Particle(sin(i * (TWO_PI / this.numParticles)) * amp + width / 2, amp * cos(i * (TWO_PI / this.numParticles)) + height / 2);
      // particle.h = i * (255 / this.numParticles);
      // this.particles.push(particle);
      
      this.particles.push(new Particle(sin(i * (TWO_PI / this.numParticles)) * amp + width / 2, amp * cos(i * (TWO_PI / this.numParticles)) + height / 2));
      this.particles.h = i * (255 / this.numParticles);
    }
  }

  update() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }

  follow(vectors) {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].follow(vectors);
    }
  }

  edges() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].edges();
    }
  }
  display(vectors) {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].display;
    }
  }
}