function Circle(){
  
  this.x = width/2;
  this.y = height/2;
  this.dia = random(30,100);
  
  this.update = function(){
    
    
  }
  this.display = function(){
    push();
    noStroke();
    fill(255,0,0);
    ellipse(this.x,this.y,this.dia);
    pop();
    
  }
}
var c;

function setup() {
  createCanvas(500,500);
  c = new Circle();
}

function draw() {
  background(100);
  c.display();
  
  
}