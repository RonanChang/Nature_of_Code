function setup() {
  createCanvas(500, 600);
  noStroke();
}

function draw() {
  background(0,20);
  translate(width / 2, height / 2);

  //sin
  var amp = 100;
  var freq = frameCount * 0.05;//if we change one freq, the trail of the white ball will be changed
  var sinVal = sin(freq) * amp;
  fill(255, 0, 0);
  ellipse(0, sinVal, 10, 10);
  text(floor(sinVal), 0 + 10, sinVal + 10);

  //cos
  var amp = 100;
  var freq = frameCount * 0.05;
  var cosVal = cos(freq) * amp;
  fill(255, 255, 0);
  ellipse(cosVal, 0, 10, 10);
  text(floor(cosVal), cosVal + 10, 0 + 10);
  
  fill(255);
  ellipse(cosVal,sinVal,30,30);
}