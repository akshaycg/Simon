var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level=0;
var started=false;
$("body").keypress(function(event){
    if(!started){
      $("#level-title").text("Level "+ level);
      nextSequence();
      started=true;
}}
);


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


$(".btn").on("click",function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

  });

  function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    }else{
      console.log("Wrong");
      var wrong=new Audio("sounds/wrong.mp3")
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function(){
      $("body").removeClass("game-over");
      },300);
      $("#level-title").text("Game Over, Press any Key to Restart.");
      startOver();
    }
  }

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber=Math.round(Math.random()*3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  //$("h1").text("Level "+ level);
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");},100);
}

function playSound(name){
  var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}
