function setup() {
  createCanvas(500, 600);

  noStroke();
}

function draw() {
  background(0);
  drawWave(2, -10, 0.005, 0.001);
  drawWave(3, 0, 0.005, 0.0015);
  drawWave(5, 5, 0.007, 0.0012);

}


function drawWave(size, yoff, freq1, freq2) {

  var resolution = 5;
  for (var x = 0; x < width; x += resolution) {
    var amp, freq, sinVal;

    amp = 0.01;
    freq = (x + frameCount) * freq1;
    sinVal = sin(freq) * amp;

    amp = 0.01;
    freq = (x + frameCount) * freq2;
    sinVal = sin(freq) * amp;

    amp = 100;
    freq = (x + frameCount) * sinVal;
    sinVal = sin(freq) * amp;

    var y = height / 2 + sinVal + yoff;
    var s = random(1, size);
    ellipse(x, y, s, s);
  }
}