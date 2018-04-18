"use strict"

class Splashing{
  constrcutor(){
    this.splash = new Waterdrop(random(width), 0);
  }
  
 update(){
   splash.update();
 }
 
 display(){
   for(var i = 0;i<10;i++){
   splash.display();
   }
 }
}
