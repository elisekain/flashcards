$(document).ready(function() {
var questionNum = 0;
var lastQuestionNum = flashcards1.questions.length - 1;

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

//Event Listeners
$("#flip").on("click", flip);
$("#next").on("click", next);
$("#prev").on("click", prev);

//Set Up Flashcards
setQuestions();

});

// Create flashcard object to contain functions.
