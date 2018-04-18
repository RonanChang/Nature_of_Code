function setup() {
  createCanvas(600, 600,WEBGL);
  //noStroke();
}

function draw() {
  background(0);
  rotateY(frameCount*0.01);
  //drawBox(0,0,0,10);
  var resolution = 10;
  for (var x = -width/2; x < width/2; x += resolution) {
    for (var z = -height/2; z < height/2; z += resolution) {

      var freq1 = (frameCount + x) * 0.005;
      var freq2 = (frameCount + z) * 0.005;
      var amp = -80;
      var noiseVal = noise(freq1, freq2)*amp;
      var y = 200 + noiseVal;
      var clr = map(noiseVal, 0, 1, 0, 255);

      fill(255,20);
      //rect(x, y, resolution, resolution);
      drawBox(x,y,z,5);
    }
  }
}

function drawBox(x,y,z,s){
  push();
  translate(x,y,z);
  sphere(s);
  pop();
}