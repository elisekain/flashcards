"use strict"
$(document).ready(function() {
  var userSelectedQuestions = flashcards1.questions.slice(0);
  var currentQuestions = userSelectedQuestions.slice(0);
  var questionIndex = 0;
  var lastQuestionIndex = currentQuestions.length - 1;

  // Set Up Question On Flashcard
  var setQuestions = function() {
    // Update Cards Left in Stack
    lastQuestionIndex = currentQuestions.length - 1;
    $(".count").text(currentQuestions.length);

    // Clear Previous Card Text and Styling
    $("#back_side").html("");
    $("#front_side").html("");
    $("#back_side").css("font-size", "1.5rem");

    // Append text to front and back sides.
    currentQuestions[questionIndex].forEach(function(e, i) {
      if (i === 0) {
        $("#front_side").append("<p>" + currentQuestions[questionIndex][i] + "</p>");
      } else {
        $("#back_side").append("<p>" + currentQuestions[questionIndex][i] + "</p>");
      }

      // Reduce font size if more than 2 items on back
      if (i > 2) {
        $("#back_side").css("font-size", "1rem");
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
    console.log("flipped!");
    $("#back_side").toggleClass("hide");
    $("#front_side").toggleClass("hide");
  }

  // Reset
  var resetFlashcards = function() {
    currentQuestions = userSelectedQuestions.slice(0);
    questionIndex = 0;
    lastQuestionIndex = currentQuestions.length - 1;
    setQuestions();
    resetCardSide();
  }

  var selectTopic = function(topicName, topBorderColor) {
    userSelectedQuestions = topicName.questions.slice(0);
    $(".topic").text(topicName.topic);
    $("#flashcard").css("border-top-color", topBorderColor);
    resetFlashcards();
  }

  //Event Listeners
  $("#flip").on("click", flip);
  $("#next").on("click", next);
  $("#prev").on("click", prev);
  $("#reset").on("click", resetFlashcards);

  $(".topic1").on("click", function() {
    selectTopic(flashcards1, "#F64747");
  });

  $(".topic2").on("click", function() {
    selectTopic(flashcards2, "#F39C12");
  });

  $(".create_flashcards").on("click", function() {
    addMoreCYOCards();
    $("#cyo").slideDown().toggleClass("hide");
  });

  $("#cyo_submit").on("click", function(e) {
    e.preventDefault();
    createYourOwn(); // See cyo.js for this function
    selectTopic(flashcards_cyo, "#019875");
  });

  $(".addMore").on("click", function(e) {
    e.preventDefault();
    addMoreCYOCards();
  });

  $(".fa-plane").on("click", function() {
    $(this).toggleClass("fly");
  });

  //Keyboard Shortcuts
  $("body").keypress(function(e) {
    // 120 is "X"
    if (e.which == 120) {
      $("#mark_complete").prop("checked", true);
    // 122 is "Z"
    } else if (e.which == 122) {
      $("#mark_complete").prop("checked", false);
    }
  });

  $("body").keyup(function(e) {
    // 32 is spacebar
    if (e.which == 32) {
      e.preventDefault();
      flip();
    // 37 is left arrow
    } else if (e.which == 37) {
      prev();
    // 39 is right arrow
    } else if (e.which == 39) {
      next();
    // 82 is "R"
    } else if (e.which == 82) {
      resetFlashcards();
    }
  });

  //Set Up Flashcards
  setQuestions();
});

// Create flashcard object to contain functions.
// Spacebar is still a problem...but only sometimes
// Make function for select topics
// If cyo cards are empty, don't create the array
// Add option for more cards
