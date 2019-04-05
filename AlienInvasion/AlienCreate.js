function Alien(x, y, size, color) {
    
    this.place = createVector(x, y);
    
    this.size = size;
    this.color = color;
    
}

Alien.prototype.update = function() {
    
  var path = createVector(width / 2, height / 2).sub(this.place); // figure out path
  
  //Sets the speed of the Alien based on speed
  path.setMag(5.7 - log(this.size)); 

  //Changes position depending on the path
  this.place.add(path); 

  //Checks to see if the Alien collided with the ship
  var colCheck = dist(this.place.x, this.place.y, width / 2, height / 2);

  if (colCheck < this.size / 2) {
		// distance is greater than the raidus

    endGame();
  }
    
    
};

Alien.prototype.draw = function() {
    
    fill(51);
    stroke(this.color);
    strokeWeight(5);
    
    ellipse(this.place.x, this.place.y, this.size);
};

