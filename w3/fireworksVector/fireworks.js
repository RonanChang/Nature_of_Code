
function Firework() {
  this.h = random(360);
  this.firework = new Particle(random(width), height, this.h, true);
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

      //var x = 16 * pow(sin(i),3);
      //var y = 13 * cos(i)-5*cos(2*i)-2*cos(3*i)-cos(4*i);
      var p = new Particle(this.firework.loc.x, this.firework.loc.y, this.h, false);
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