$(document).ready(function() {
var questionNum = 0;
var lastQuestionNum = flashcards1.questions.length - 1;

var setNumOfQuestions = function() {
  $(".count").text(flashcards1.questions.length + " Flashcards Remaining");
}

// Set Up Question On Flashcard
var setQuestions = function() {
  $("#front_side").text(flashcards1.questions[questionNum][0]);
  $("#back_side").text(flashcards1.questions[questionNum][1]);
}

// Hide Back Side of Card
var resetCardSide = function() {
  $("#back_side").addClass("hide");
  $("#front_side").removeClass("hide");
}

// Go to Previous Flashcard
var next = function() {
  markComplete();
  if (questionNum === lastQuestionNum) {
    questionNum = 0;
  } else {
    questionNum++;
  }
  resetCardSide();
  setQuestions();
}

// Go to Next Flashcard
var prev = function() {
  markComplete();
  if (questionNum === 0) {
    questionNum = lastQuestionNum;
  } else {
    questionNum--;
  }
  resetCardSide();
  setQuestions();
}

// Flip Flashcard
var flip = function() {
  $("#back_side").toggleClass("hide");
  $("#front_side").toggleClass("hide");
}

// Remove Question if "Mark Complete" Box is checked
var markComplete = function() {
  if ($("input:checked").length) {
    flashcards1.questions.splice(questionNum, 1);
    $("#mark_complete").prop("checked", false);
  }
  setNumOfQuestions();
}


//Event Listeners
$("#flip").on("click", flip);
$("#next").on("click", next);
$("#prev").on("click", prev);

//Keyboard Shortcuts
$("body").keypress(function(event) {
  // 120 is "X"
  if (event.which == 120) {
    $("#mark_complete").prop("checked", true);
  // 122 is "Z"
  } else if (event.which == 122) {
    $("#mark_complete").prop("checked", false);
  }
});

$("body").keydown(function(event) {
  // 32 is spacebar
  if (event.which == 32) {
    flip();
  // 37 is left arrow
  } else if (event.which == 37) {
    prev();
  // 39 is right arrow
  } else if (event.which == 39) {
    next();
  }
});

//Set Up Flashcards
setQuestions();
setNumOfQuestions();

});

// Create flashcard object to contain functions.
