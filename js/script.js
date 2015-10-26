$(document).ready(function() {
  var currentQuestions = flashcards1.questions;
  var questionIndex = 0;
  var lastQuestionIndex = currentQuestions.length - 1;
  var userSelectedQuestions = flashcards1.questions;

  // Set Up Question On Flashcard
  var setQuestions = function() {
    lastQuestionIndex = currentQuestions.length - 1;
    $(".count").text(currentQuestions.length);
    $("#back_side").html("");
    $("#front_side").html("");
    currentQuestions[questionIndex].forEach(function(e, i) {
      if (i === 0) {
        $("#front_side").append("<p>" + currentQuestions[questionIndex][i] + "</p>");
      } else {
        $("#back_side").append("<p>" + currentQuestions[questionIndex][i] + "</p>");
      }

      if (i >= 2) {
        $("#back_side p").css("font-size", "1rem");
      }
    })
  }

  // Remove Question if "Mark Complete" Box is checked
  var markComplete = function() {
    if ($("input:checked").length) {
      currentQuestions.splice(questionIndex, 1);
      $("#mark_complete").prop("checked", false);
      return true;
    }
  }

  // Hide Back Side of Card; Show Front Side
  var resetCardSide = function() {
    $("#back_side").addClass("hide");
    $("#front_side").removeClass("hide");
  }

  // Go to Next Flashcard
  var next = function() {
    if (!markComplete()) {
      if (questionIndex === lastQuestionIndex) {
        questionIndex = 0;
      } else {
        questionIndex++;
      }
    }
    resetCardSide();
    setQuestions();
  }

  // Go to Previous Flashcard
  var prev = function() {
    markComplete();
    if (questionIndex === 0) {
      questionIndex = lastQuestionIndex;
    } else {
      questionIndex--;
    }
    resetCardSide();
    setQuestions();
  }

  // Flip Flashcard
  var flip = function() {
    $("#back_side").toggleClass("hide");
    $("#front_side").toggleClass("hide");
  }

  // Reset
  var resetFlashcards = function() {
    currentQuestions = userSelectedQuestions;
    questionIndex = 0;
    lastQuestionIndex = currentQuestions.length - 1;
    setQuestions();
    resetCardSide();
  }

  var selectTopic2 = function() {
    userSelectedQuestions = flashcards2.questions;
    $(".topic").text(flashcards2.topic);
    $("#flashcard").css("border-top-color", "#F39C12");
    resetFlashcards();
  }

  var selectTopic1 = function() {
    userSelectedQuestions = flashcards1.questions;
    $(".topic").text(flashcards1.topic);
    $("#flashcard").css("border-top-color", "#F64747");
    resetFlashcards();
  }
  //Event Listeners
  $("#flip").on("click", flip);
  $("#next").on("click", next);
  $("#prev").on("click", prev);
  $("#reset").on("click", resetFlashcards);
  $(".topic2").on("click", selectTopic2);
  $(".topic1").on("click", selectTopic1);

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

  $("body").keyup(function(event) {
    // 32 is spacebar
    if (event.which == 32) {
      event.preventDefault;
      flip();
    // 37 is left arrow
    } else if (event.which == 37) {
      prev();
    // 39 is right arrow
    } else if (event.which == 39) {
      next();
    // 82 is "R"
    } else if (event.which == 82) {
      resetFlashcards();
    }
  });

  //Set Up Flashcards
  setQuestions();
});

// Create flashcard object to contain functions.
// Spacebar keypress is not working correctly
