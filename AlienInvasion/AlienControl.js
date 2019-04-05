var field = []; // tracks ateroids
var projectiles = []; // tracks lazers

var score;
var ship; 

function setup() {
  //Creates the canvas where the game is played
  createCanvas(700, 700);

  //Orients the Screen to fit the canvas
  translate(width / 2, height / 2);  

  //Creates a player, or ship and adds color
  ship = new Ship("#003399","#00FF00");
  //Creates a score keeping element
  score = 0;
}

//Adds all the drawn elements to the game
function draw() {
  background(0);
  keyPress(); //Handles the inputs from the user
  collisionDetect(); //Handles Collision
  shootFunction(); //Handles the projectiles
  asteroidPopulate(); //Creates the Astroids
  scoreKeeper(); //Keeps the score
  ship.update(); //Updates the ships state aka. Angle
  ship.draw(); //Draws the ship
}

//Creates new asteroids throuhgout the game
function asteroidPopulate() {

    //creates frames
	if (frameCount % 30 === 0) { // every half-a-second
    if (random() > map(score, 0, 1000, 0.75, 0.25)) { // increase difficulty

      //Randomizes where the asteriod will come from
      var r = random(); // plane to randomize

	 //Makes it so asteroids only generate on the edge of the canvas
      var x = (r > 0.5) ? random(width) : (random() > 0.5) ? 0 : width;
      var y = (r < 0.5) ? random(height) : (random() > 0.5) ? 0 : height;

      field.push(new Alien(x, y, noise(frameCount) * 100, "#00CCFF"));
    }
  }
}

//Draws, updates, and handles collision for asteroids
function collisionDetect() {

	for (var i = field.length - 1; i >= 0; i--) {

    field[i].update();
    field[i].draw();

		//Checks for collision
    for (var j = projectiles.length - 1; j >= 0; j--) {

      //detects if alien was hit
      if (projectiles[j].hit(field[i])) {
				

				//manages the arrays
        field.splice(i, 1);
        projectiles.splice(j, 1);

        score++;
        return;
      }
    }
  }
}

//Handles the Lazer logic and display
function shootFunction() {

    //Everytime User presses space a new lazer is created it's added to an array
	for (var o = projectiles.length - 1; o >= 0; o--) {
    
    //Determines whether or not a lazer is onscreen
    if (projectiles[o].onScreen) {

	  //Updates the lazer and draws the 
      projectiles[o].update();
      projectiles[o].draw();
    } else {
        
      //Determines when a lazer leaves the canvas and deletes it
      projectiles.splice(o, 1);
    }
  }
}


//Creates an event listener that for left and right arrow keys
function keyPress() {

//If left arrow is pressed
  if (keyIsDown(LEFT_ARROW)) {

    ship.rotate(-0.05);

  //If right arrow is pressed
  } else if (keyIsDown(RIGHT_ARROW)) {

    ship.rotate(0.05);
  }
}

//Creates an event listner that waits for the space bar to be pressed
function keyPressed() {

  switch (keyCode) {

    //case 32 is the code assigned to the space bar
    case 32:
      ship.fire(projectiles);
      break;
  }
}

//Draws the score on the canvas
function scoreKeeper() {

  fill(255); //Sets the color
  textSize(35); //Text size of score
  textAlign(RIGHT); //Alignes Text
  text(score, 650, 50); //Sets where the score is located X and Y
}

//Ends the game loop and displays message
function endGame() {

  noLoop();
  textAlign(CENTER); //Aligns text
  fill(255); //Sets color
  textSize(100); //Sets font size
  text("Game Over", width / 2, 300); //Writes and displays text
}
