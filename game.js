//Include jQuery to site. Look at your notes to see how to include jQuery

//jQuery check
$("h1").css("color", "red");

///////////////////////////////////////////////////////////////////////////

var level = 0;
var gameStarted = false;
var colors = ["green", "red", "yellow", "blue"]

var userClicks = [];
var correctColors = [];

//Start the game when a key pressed, for just one time 
$(document).keypress(() => {
   if(!gameStarted){
      //make this Level 1: <h1 id="level-title">Press A Key to Start</h1>
      $("h1").text("Level " + (level+1))

      //make this invisible: <h2 id="color-title">Remember the colors!</h2>
      $("h2").hide();

      //game is now started, do not call this function again
      gameStarted = true;

      //call nextLevel to game continue
      nextLevelStart();
   }
})

//When a button clicked, play that button's sound and show the animation
//This function is always triggered when user clicks any of the buttons
//Therefore check user's clicks if it is true in every step
$(".btn").click((event) => {

   //get the color from index.html, //"event" means clicked button
   var color = $(event.target).attr("id"); 
   //console.log(color);

   //play the sound
   playSound(color);

   //show the animation, it does not depend on the color
   animation(color);

   //Check users clicks if it true in every step
   userClicks.push(color); //push this color to the end of the array, meaning that it checks that step
   checkAnswer(userClicks.length-1); //last element because we want to check last click
})

//***This function is only for the indication of next level started. Just level up and show the button to be clicked 
const nextLevelStart = () => {

   //in each level, restart user's clicks in order to compare them in each level
   userClicks = [];

   //increase the level and show h1 again according to that level
   level++;
   $("h1").text("Level " + level);

   //choose a random color 
   var randomNumber = Math.floor(Math.random() * 4); //random number [0, 3]
   var correctColor = colors[randomNumber];

   //make a sound for that button
   playSound(correctColor);
   
   //show the button to user needed to be clicked
   $("#"+correctColor).fadeIn(100).fadeOut(100).fadeIn(100);

   //add to button to array in order to compare with the user's click
   correctColors.push(correctColor);
}

//This function is always triggered when user clicks any of the buttons
//Therefore check users clicks in every step
const checkAnswer = (lastClickIndex) => {
   //To see the arrays in each step
   console.log("User clicks: " + userClicks);
   console.log("Correct result: " + correctColors);

   //user clicks correct color in every step in that level
   if(userClicks[lastClickIndex] == correctColors[lastClickIndex]){
      //end of the level reached, go to next level
      if(userClicks.length == correctColors.length && userClicks[lastClickIndex] == correctColors[lastClickIndex]){
         setTimeout(() => {
            nextLevelStart();
        }, 1000); //1000 milliseconds = 1 second
      }
   }else{ //user couldnt choose the correct color
      //make background color red, include .game-over css to <body> 
      $("body").addClass("game-over");
      setTimeout(() => {
         $("body").removeClass("game-over");
      }, 100); //remove the class after 1s

      //Sound wrong.mp3
      playSound("wrong");

      //Change h1 as "Game over, press a key to restart"
      $("h1").text("Game Over, Press a Key to Restart");

      //Let user start the new game
      level = 0;
      gameStarted = false;
      userClicks = [];
      correctColors = [];
   }
}

const playSound = (color) => {
   var audio = new Audio("./sounds/" + color + ".mp3");
   audio.play();
}

const animation = (color) => {
   //in the index.html, find that button and add ".pressed" in styles.css
   $("#" + color).addClass("pressed");

   //Remove the class after the animation is complete
   setTimeout(() => {
      $("#" + color).removeClass("pressed");
   }, 100); // remove the class after 1s
}
