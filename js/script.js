"use strict"
$(document).ready(function() {
  var userSelectedQuestions = flashcards1.questions.slice(0);
  var currentQuestions = userSelectedQuestions.slice(0);
  var questionIndex = 0;
  var lastQuestionIndex = currentQuestions.length - 1;

  var clearPrevCard = function() {
    // Clear Previous Card Text and Styling
    $("#back_side").html("");
    $("#front_side").html("");
    $("#back_side").css("font-size", "1.5rem");
  }

  var updateCardsLeft = function() {
    // Update Cards Left in Stack
    lastQuestionIndex = currentQuestions.length - 1;
    $(".count").text(currentQuestions.length);
  }

  var finishMsg = function() {
    if (lastQuestionIndex === -1) {
      $("#front_side").append("<p class='finishMsg'>You've completed this flashcard stack!<br> Press 'R' to reset</p>");
      return true;
    } else {
      return false;
    }
  }

  // Hide Back Side of Card; Show Front Side
  var resetCardSide = function() {
    $("#back_side").addClass("hide");
    $("#front_side").removeClass("hide");
  }

  // Set Up Question On Flashcard
  var setQuestions = function() {
    updateCardsLeft();
    clearPrevCard();
    resetCardSide();

    if (!finishMsg()) {
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
  }

  // Remove Question if "Mark Complete" Box is checked
  var markComplete = function() {
    if ($("input:checked").length) {
      currentQuestions.splice(questionIndex, 1);
      $("#mark_complete").prop("checked", false);
      return true;
    }
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
    setQuestions();
  }

  // Randomize Cards
  var randomize = function() {
    var randomNum = Math.floor(Math.random() * currentQuestions.length);
    return randomNum;
  }

  // Randomize / Mixup Cards Cards
  var mixupCards = function() {
    markComplete();
    questionIndex = randomize();
    setQuestions();
  }

  // Flip Flashcard
  var flip = function() {
    $("#back_side").toggleClass("hide");
    $("#front_side").toggleClass("hide");
  }

  // Reset
  var resetFlashcards = function() {
    currentQuestions = userSelectedQuestions.slice(0);
    questionIndex = 0;
    lastQuestionIndex = currentQuestions.length - 1;
    setQuestions();
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
  $("#random").on("click", mixupCards);
  $("#reset").on("click", resetFlashcards);

  //Switch to Topic 1
  $(".topic1").on("click", function() {
    selectTopic(flashcards1, "#F64747");
  });

  //Switch to Topic 2
  $(".topic2").on("click", function() {
    selectTopic(flashcards2, "#F39C12");
  });

  // Show CYO Div
  $(".create_flashcards").on("click", function() {
    addMoreCYOCards();
    $("#cyo").slideDown().toggleClass("hide");
  });

  // Submit & Create CYO Cards
  $("#cyo_submit").on("click", function(e) {
    e.preventDefault();
    createYourOwn(); // See cyo.js for this function
    selectTopic(flashcards_cyo, "#019875");
    $(window).scrollTo($("h1"), {
      duration: "2s",
      easing: "swing"
    });
  });

  // Add more CYO card inputs
  $(".addMore").on("click", function(e) {
    e.preventDefault();
    addMoreCYOCards();
  });

  // Make the plane fly!
  $(".fa-plane").on("click", function() {
    $(this).toggleClass("fly");
  });

  //Keyboard Shortcuts
  $("body").keypress(function(e) {
    // 120 is "X"
    if (e.which == 120 && e.target == document.body) {
      $("#mark_complete").prop("checked", true);
    // 122 is "Z"
    } else if (e.which == 122 && e.target == document.body) {
      $("#mark_complete").prop("checked", false);
    }
  });

  $("body").keyup(function(e) {
    // 70 is "F""
    if (e.which == 70 && e.target == document.body) {
      flip();
    // 37 is left arrow
    } else if (e.which == 37 && e.target == document.body) {
      prev();
    // 39 is right arrow
    } else if (e.which == 39 && e.target == document.body) {
      next();
    // 82 is "R"
    } else if (e.which == 82 && e.target == document.body) {
      resetFlashcards();
    }
  });

  //Set Up Flashcards
  setQuestions();
});

// Create flashcard object to contain functions.
