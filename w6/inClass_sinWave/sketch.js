function setup() {
  createCanvas(500, 600);
  
  noStroke();
  
}

function draw() {
  background(0,10);

  fill(255);
  var freq = frameCount * 0.05;
  var amp = 50;
  var sinVal = sin(freq) * amp;
  ellipse(frameCount % width, height *0.2 + sinVal, 5, 5);

  var freq = frameCount * 0.04;
  var amp = 50;
  var noiseVal = noise(freq) * amp * 2 - amp;
  ellipse(frameCount % width, height / 2 + noiseVal, 5, 5);

  var freq = frameCount * 0.04;
  var amp = 50;
  var randomVal = random(-1,1) * amp;
  ellipse(frameCount % width, height * 0.8 + randomVal, 5, 5);
}