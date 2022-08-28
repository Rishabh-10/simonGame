
const buttonColours = new Array("red", "blue", "green", "yellow");
var gamePattern = new Array();
var userClickedPattern = new Array();
var level = 0;
var started = false;

// computer choice
function nextSequence() {


    userClickedPattern = [];
  
    level++;
    $("#level-title").text("Level " + level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(randomChosenColour);
}

// Game Over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


// ANIMATION AND SOUND
function animationComputer(selector) {
    // adding animation
    $(selector).delay(100).fadeOut().fadeIn('fast');
}

function animationUser(selector) {
    // adding animation
    $(selector).addClass('pressed');

    setTimeout(function() {
        $(selector).removeClass('pressed');
    }, 100);
}

function sound(chosenColour) {
    // adding sound
    const audio = new Audio("sounds/" + chosenColour + ".mp3");
    audio.play();
}


function checkAns(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

        sound('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 100);

        $("#level-title").text("Game Over, Press Any Key to Start");
        
        startOver();
    }

}

// user

// NOTE: This does not work in arrow function if you ask for this it will provide you with the window object.
$('.btn').on('click', function () {
        
    var userColourChoice = $(this).attr('id');
    let selector = "#" + userColourChoice;
    
    userClickedPattern.push(userColourChoice);

    sound(userColourChoice);
    animationUser(selector);

    checkAns(userClickedPattern.length - 1);
});


function gameStarts() {

    //computer
    var randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);

    // fetching id
    var selector = "#" + randomChosenColour;
    sound(randomChosenColour);
    animationComputer(selector);

    userChoice();
}


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
