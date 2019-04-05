function Ship(shipColor, shipBorder) {


    this.angle = 0; // Starting angle for the ship
    this.newAngle = 0; // Rotation added to angle
  
    this.shipColor = shipColor; //Creates a color for the Ships body
    this.shipBorder = shipBorder; // Creates a color for the ships border
  }
  
  //Changes the angle of the ship by adding the newAngle user input
  Ship.prototype.update = function() {
  
    //These dictates how fast the ship can turn
    this.angle += this.newAngle;
    this.newAngle *= 0.4;
  };
  
  //fires the lazer and creates a new lazer
  Ship.prototype.fire = function(projectiles) {
  
    //Creates a new bullet entity in the game. Angle, Which direction the lazer comes from, and speed 
    projectiles.push(new Lazer(-this.angle + PI, 5, 10));
  };
  
  //designates angleVelocity by its acceleration
  Ship.prototype.rotate = function(acceleration) {
  
    this.newAngle += acceleration;
  };
  
 //Draws and animates the ship
  Ship.prototype.draw = function() {
  
    fill(this.shipColor);
    strokeWeight(2);
    stroke(this.shipBorder);
  
    push(); 
  
    translate(width / 2, height / 2); // draw relative to the center
    rotate(this.angle); // draw relative to the angle of the ship
  
    //Draws the base of the ship
       
    beginShape();
    vertex(0, -30);
    vertex(15, 15);
    vertex(-15, 15);
    endShape(CLOSE);

    pop(); 
  };