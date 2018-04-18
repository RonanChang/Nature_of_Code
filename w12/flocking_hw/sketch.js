var boids = [];

function setup() {
  createCanvas(800, 600);

  for (var i = 0; i < 200; i++) {
    boids.push(new Boid(random(width),random(height)));
  }
}

function draw() {
  background(21);

  for (var i = 0; i < boids.length; i++) {
    var b = boids[i];
    
    // var target = createVector(mouseX, mouseY);
    // b.seek(target);
    
    //b.separate(boids);
    //b.cohesion(boids);
    //b.align(boids);
    b.flock(boids);
    b.drawLines(boids);
    b.update();
    b.checkEdges();
    b.display();
  }
}