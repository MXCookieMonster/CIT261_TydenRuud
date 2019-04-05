//This class creates and draws the lazer that the ship fires

function Lazer(angle, radius, speed) {

  //cartesian coordinate holders
  this.x = null;
  this.y = null;

  //Holds the angle at which the lazer was shot
  this.angle = angle; 
  //Holds the Size of the lazer
  this.radius = radius;

  //Creates the speed of the lazer
  this.speed = speed; 

  //Onscreen determines whether or not the the lazer is on screen
  this.onScreen = true;
}

//Registers new position and sends the cartesian coordinates, updates on screen
Lazer.prototype.update = function() {

  //Moves the Lazer across the screen
  this.radius += this.speed;

 //Changes the the position to cartesian coordinates
  this.x = this.radius * sin(this.angle);
  this.y = this.radius * cos(this.angle);

  //Updates the onscreen display
  this.onScreen = (this.radius < width);
};

//Senses whether a lazer hit an Alien
Lazer.prototype.hit = function(Alien) {

  var colCheck = dist(this.x + width / 2, this.y + height / 2, Alien.place.x, Alien.place.y);

  return (colCheck < Alien.size / 2);
};

//Art for the Lazer
Lazer.prototype.draw = function() {

 //Changes the color and size of the ships lazers
  stroke("#00FF00");
  strokeWeight(10);

  //Saves the translation of the lazer
  push();

  //Makes the projectiles appear to be fireing from the front of the ship
  translate(width / 2, height / 2);
  point(this.x, this.y);

  //Removes the tranlation of the lazer
  pop(); 
};