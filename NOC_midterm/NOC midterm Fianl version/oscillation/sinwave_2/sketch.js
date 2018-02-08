var num = 20;
var step, sz, offSet, theta;

function preload() {
  sound1 = loadSound('audio/myaudio.mp3');

}

function setup() {
  createCanvas(800, 600);
  strokeWeight(5);
  step = 22;
  theta = 0;

  amplitude = new p5.Amplitude();
  sound1.play();
  amplitude.setInput(sound1);
  
  fft = new p5.FFT();
  fft.setInput(sound1);
  
}

function draw() {
  background(20);
  translate(width / 2, height /2);


  var amp = amplitude.getLevel();
 // console.log(amp);
  
  var freq = fft.waveform();
  console.log(freq);
  
  for (var i = 0; i < num; i++) {
    stroke(255);
    noFill();
    sz = i * step;
    var offSet = TWO_PI / num * i;
    var arcEnd = map(sin(theta + offSet)*(amp+1), -2, 2, 0, TWO_PI);
    arc(0, 0, sz, sz, PI, arcEnd);
  }
  colorMode(RGB);
  //resetMatrix();
  theta += amp*0.3;

}