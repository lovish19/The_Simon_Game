var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
//CHECK game has started or not
var started= false;

var level=0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
      }
  });

  $(".btn").click( function() {
    var userChosenColor= $(this).attr("id") ;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);  //to detect which keys are pressed and pushd into user array pattern
  });

   //check the answer whether it matches the pattern or not
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length===gamePattern.length){
    setTimeout( function(){
     nextSequence();
    },1000);
   }

  } else{
    console.log("wrong");
    playSound("wrong");
    
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart"); 
    startOver();   
  }
} 
  
function nextSequence(){
    userClickedPattern=[]; //once nextSequence is triggered the array is emptied again before going to next level

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomColor=buttonColors[randomNumber];
    gamePattern.push(randomColor);
  
    //random color id choosing
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomColor);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(curentColor){
  $("#"+curentColor).addClass("pressed");
  setTimeout( function(){
      $("#"+curentColor).removeClass("pressed");
  },100);
}

function startOver(){
   level=0;
   gamePattern=[];
   started=false;
}
