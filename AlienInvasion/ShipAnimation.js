//Creates a constant that makes sure that sprites are 16x16
const SPRITE_SIZE = 16;

//Holds animation values
var shipAnimation = function(frame_set, delay) {
   this.count = 0; //Counts the game cycles since the last frame change
   this.delay = delay; //The number of cycles to wait before it changes frame
   this.frame = 0; //Pairs with a value on the sprite sheet that displays the action
   this.frame_index = 0; //Holds the number of sprite animations assigning numbers
   this.frame_set = frame_set; //The current frame set used, the pair that generate a movement feel to the img.
};

//Runs the animation
Animation.prototype = {

//Creates transitions between the animation frame sets and sets the delay
   change:function(frame_set, delay = 15) {
       
       //If the frame set is different these rules run
       if (this.frame_set != frame_set) {
           this.count = 0;  //Reset the count
           this.delay = delay; //Sets a new Delay
           this.frame_index = 0; //Starts at the first frame in the set
           this.frame_set = frame_set; //Sets the new frame set
           this.frame = this.frame_set[this.frame_set]; //Sets the frame value
       }
   },

   //Creates on each game cycle
   update:function() {
       this.count ++; //Keeps track of the cycles that have passed from the last frame
       
       //If the cycle has enough counts the frame changes
       if (this.count >= this.delay) {
           this.count = 0; //Reset the timer till next frame
           //Makes sure that the frame index got reset to 0 and fixes dispcrepencies
           this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
           this.frame = this.frame_set[this.frame_index]; //Changes the current frame value
       }


   }


}