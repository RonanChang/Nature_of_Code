function Particle(x, y, h, exploding) {
  this.h = h;
  this.loc = createVector(x, y);
  this.lifespan = 255;
  this.exploding = exploding;
  this.acc = createVector(0, 0);

  if (this.exploding) {
    this.vel = createVector(0, random(-11, - 6));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 10));
  }

  this.update = function() {
    if (!this.exploding) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    colorMode(HSL);
    if (!this.exploding) {
      strokeWeight(2);
      stroke(this.h, 100, 50, this.lifespan);
    } else {
      strokeWeight(2);
      stroke(this.h, 100, 50);
    }
    point(this.loc.x, this.loc.y);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }
}
