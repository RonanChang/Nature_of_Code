var img;

function preload() {
  img = loadImage("universe.jpg");


}

function setup() {
  createCanvas(500, 600);
  //img = loadImage("universe.jpg");

  //image(img.x.y)
  //image(img,x,y,w,h)
  print(img.width);
  print(img.height); //the number is 1 and 1 because the image hasn't beed loaded yet
  // it takes one frame to load the image;
  // if we put this code in the draw() function,
  //we will see the real size of the image;
  //image(img,0,0);

}

function draw() {

  print(img.width);
  image(img, 0, 0);
  if (img.width > 1) {
    noLoop(); // notice the uppercase of the letter
  }


}