"use strict";
var CO_AIR = 0.02;
var CO_WATER = 0.7;
var balls = [];
var WATER_LEVEL;

function setup() {
   
  
  createCanvas(500, 600);
  WATER_LEVEL = height/2;
  noStroke();
  
  for (var i = 0; i < 3; i++) {
    balls.push(new Ball(random(width), 0));
  }
}

function draw() {
  background(0);

  for (var i = 0; i < balls.length; i++) {
    var b = balls[i];
    var gravity = createVector(0, 0.3);
    gravity.mult(b.mass);
    b.applyForce(gravity);
    
    /*  
    var friction = p5.Vector.mult(b.vel,-1);
    friction.normalize();
    if(b.pos.y < height/2){
      //air
      friction.mult(0.4);
    }else{
      //water
      friction.mult(0.95);
      
      var buo = createVector(0,-10);
      b.applyForce(buo);
    }
    b.applyForce(friction);*/
    
    var resistence = p5.Vector.mult(b.vel,-1);
    resistence.normalize();
    var speed = b.vel.mag();
    
    if(b.pos.y < WATER_LEVEL){
    var resistMag = CO_AIR * speed * speed;
    }else{
      var resistMag = CO_WATER * speed * speed;
    }
    
    resistence.mult(resistMag);
    b.applyForce(resistence);
    
    b.update();
    b.display();

  }
  
  fill(0,0,255,100);
  rect(0,WATER_LEVEL,width,height-WATER_LEVEL);

}