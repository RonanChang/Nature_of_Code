"use strict";
class Particle {
  constructor() {
    this.pos = createVector(0, 0, 0);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = random(1, 10);
    this.rad = this.mass * 3;
    this.d = 2 * this.r;

    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.a = 100;

  }

  position(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  
  velocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }
  colour(r, g, b, a) {
    this.r = r;
    this.a = a;
    this.g = g;
    this.b = b;
    return this;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    force.div(this.mass);
    this.acc.add(force);
  }

  checkFloor() {
    if (this.pos.x > -FLOOR_SIZE / 2 && this.pos.x < FLOOR_SIZE / 2 && this.pos.z > -FLOOR_SIZE / 2 && this.pos.z < FLOOR_SIZE / 2) {
      if (this.pos.y - this.rad < FLOOR_LEVEL) {
        this.pos.y = FLOOR_LEVEL + this.rad;
        this.vel.y *= -1;
        //restitution
        var co_res = map(this.mass, 0, 10, 0.99, 0.9);
        this.vel.y *= co_res;
      }
    }
  }

  checkFloorWall() {
    //x
    if (this.pos.x < -FLOOR_SIZE / 2 || this.pos.x > FLOOR_SIZE / 2) {
      this.vel.x *= -0.95;
    }
    //z
    if (this.pos.z < -FLOOR_SIZE / 2 || this.pos.z > FLOOR_SIZE / 2) {
      this.vel.z *= -1;
    }
    this.pos.x = constrain(this.pos.x, -FLOOR_SIZE / 2, FLOOR_SIZE / 2);
    this.pos.z = constrain(this.pos.z, -FLOOR_SIZE / 2, FLOOR_SIZE / 2);
    //y
    if (this.pos.y - this.rad < FLOOR_LEVEL) {
      this.pos.y = FLOOR_LEVEL + this.rad;
      this.vel.y *= -1;
      //restitution
      var co_res = map(this.mass, 0, 10, 0.99, 0.9);
      this.vel.y *= co_res;
    }
  }

  checkCollision(other) {
    var distance = this.pos.dist(other.pos);
    if (distance < this.rad + other.rad) {
      //collided

      //this particle
      var force = p5.Vector.sub(other.pos, this.pos);
      force.normalize();
      force.mult(other.vel.mag() * 0.9);
      other.applyForce(force);

      //other particle
      force.mult(-1);
      force.normalize();
      force.mult(other.vel.mag() * 0.9);
      this.applyForce(force);

    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    //fill(this.r, this.g, this.b,this.a);
    sphere(this.rad);
    pop();
  }

}