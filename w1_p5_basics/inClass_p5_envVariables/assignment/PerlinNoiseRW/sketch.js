var w;

function setup() {

  createCanvas(400, 300);
  frameRate(10);

  w = new Walker();
}

function draw() {
  w.walk();
  w.display();

}

function Walker() {

  var x;
  var y;
  var t = 0;
  var m = 10000;

this.walk = function() {


  t = t + 0.01;
  m = m + 0.01;
  x = noise(t);
  x = map(x, 0, 1, 0, width);
  y = noise(m);
  y = map(y, 0, 1, 0, height);
};

this.display = function() {
  ellipse(x, y, 1, 1);
  };
}