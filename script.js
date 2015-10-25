$(document).ready(function() {
var questionNum = 0;

var setQuestions = function() {
  $("#front_side").text(flashcards1.questions[questionNum][0]);
  $("#back_side").text(flashcards1.questions[questionNum][1])
}

var next = function() {
  questionNum++;
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

//Set Up Flashcards
setQuestions();

});

// Create flashcard object to contain functions.
