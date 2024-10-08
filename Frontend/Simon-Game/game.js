
var tiles = ["red","green","blue","yellow"];

var count = [];
var userClick = [];

var level = 0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextS();
    started = true;
  }
});


$(".btn").click(function(){
  var chosenColor = $(this).attr("id");
  userClick.push(chosenColor);
  makeSound(chosenColor);
  makeAnimation(chosenColor);

  checkAnswer(userClick.length - 1);
})


function checkAnswer(level) {
  if (count[level] === userClick[level]) {
    if (count.length === userClick.length) {
      setTimeout(function () {
        nextS();
      }, 1000);
    }
  } else {
    console.log("wrong");
    userClick = [];
    $("h1").text("Game Over");
    gameOver();

    setTimeout(function () {
      $("h1").text("Press Any Key to Restart");
      startOver();
    }, 1000);
  }
}

function nextS() {

  userClick = [];
  level++;
  $("#level-title").text("Level " + level);
  var random = Math.floor(Math.random() * 4);
  var randomTile = tiles[random];
  count.push(randomTile);
  // makeAnimation(randomTile);
  // makeSound(randomTile);
  setTimeout(function(){allS(count)},500);
 }


 function allS() {
  for (var i = 0; i < count.length; i++) {
    setTimeout(function(index) {
      return function() {
        makeAnimation(count[index]);
        makeSound(count[index]);
        setTimeout(function() {
          // makeSound(count[index]);
        }, 400);
      };
    }(i), 400 * i);

  }
}



function makeSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function makeAnimation(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  count = [];
  started = false;
}

function gameOver() {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1000);
}