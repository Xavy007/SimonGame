let colors = ["red", "blue", "green", "yellow"];
let pattern = [];
let clicked = [];
let start = false;
let lvl = 0;

$(document).keypress(function() {

  if (!start) {
    $("#level-title").text("Level " + lvl);
    ModeSequence();
    start = true;
  }
});
$(".btn").click(function() {
  let chosen = $(this).attr("id");
  clicked.push(chosen);
  sound(chosen);
  press(chosen);
  answer(clicked.length-1);
});
function ModeSequence() {
    clicked = [];
    lvl++;
    $("#level-title").text("Level " + lvl);
    let random = Math.floor(Math.random() * 4);
    let rColor = colors[random];
    pattern.push(rColor);
    $("#" + rColor).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(rColor);
  }
  
function answer(currentLevel) {
    if (pattern[currentLevel] === clicked[currentLevel]) {
      if (clicked.length === pattern.length){
        setTimeout(function () {
          ModeSequence();
        }, 1000);
      }
    } else {
      sound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      
        
      }, 200);
      
      startOver();
    }
}
function startOver() {
    pattern = [];
    lvl = 0;  
    start = false;
}
function press(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  


function sound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


