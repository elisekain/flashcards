"use strict"
$(document).ready(function() {
  var userSelectedQuestions = flashcards1.questions.slice(0);
  var currentQuestions = userSelectedQuestions.slice(0);
  var questionIndex = 0;
  var lastQuestionIndex = currentQuestions.length - 1;

  var flashcard = {
    // Set Up Question On Flashcard
    setQuestions: function() {
      flashcard.updateCardsLeft();
      flashcard.clearPrevCard();
      flashcard.resetCardSide();
      flashcard.addText();
    },

    updateCardsLeft: function() {
      // Update Cards Left in Stack
      lastQuestionIndex = currentQuestions.length - 1;
      $(".count").text(currentQuestions.length);
    },

    clearPrevCard: function() {
      // Clear Previous Card Text and Styling
      $("#back_side").html("");
      $("#front_side").html("");
      $("#back_side").css("font-size", "1.5rem");
    },

    // Hide Back Side of Card; Show Front Side
    resetCardSide: function() {
      $("#back_side").addClass("hide");
      $("#front_side").removeClass("hide");
    },

    addText: function() {
      if (!flashcard.finishMsg()) {
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
        });
      }
    },

    finishMsg: function() {
      if (lastQuestionIndex === -1) {
        $("#front_side").append("<p class='finishMsg'>You've completed this flashcard stack!<br> Press 'R' to reset</p>");
        return true;
      } else {
        return false;
      }
    }
  }


  var selectTopic = function(topicName, topBorderColor) {
    flashcard.userSelectedQuestions = topicName.questions.slice(0);
    $(".topic").text(topicName.topic);
    $("#flashcard").css("border-top-color", topBorderColor);
    controls.resetFlashcards();
  }

  var controls = {

    // Flip Flashcard
    flip: function() {
      $("#back_side").toggleClass("hide");
      $("#front_side").toggleClass("hide");
    },

    // Reset
    resetFlashcards: function() {
      currentQuestions = userSelectedQuestions.slice(0);
      questionIndex = 0;
      lastQuestionIndex = currentQuestions.length - 1;
      flashcard.setQuestions();
    },

    // Randomize Cards
    randomize: function() {
      var randomNum = Math.floor(Math.random() * currentQuestions.length);
      return randomNum;
    },

    // Randomize / Mixup Cards Cards
    mixupCards: function() {
      controls.markComplete();
      questionIndex = controls.randomize();
      flashcard.setQuestions();
    },

    // Go to Previous Flashcard
    prev: function() {
      controls.markComplete();
      if (questionIndex === 0) {
        questionIndex = lastQuestionIndex;
      } else {
        questionIndex--;
      }
      flashcard.setQuestions();
    },

    // Go to Next Flashcard
    next: function() {
      if (!controls.markComplete()) {
        if (questionIndex === lastQuestionIndex) {
          questionIndex = 0;
        } else {
          questionIndex++;
        }
      }
      flashcard.setQuestions();
    },

    // Remove Question if "Mark Complete" Box is checked
    markComplete: function() {
      if ($("input:checked").length) {
        currentQuestions.splice(questionIndex, 1);
        $("#mark_complete").prop("checked", false);
        return true;
      }
    }
  }

  //Event Listeners
  $("#flip").on("click", controls.flip);
  $("#next").on("click", controls.next);
  $("#prev").on("click", controls.prev);
  $("#random").on("click", controls.mixupCards);
  $("#reset").on("click", controls.resetFlashcards);

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
    cyo.addMoreCYOCards();
    $("#cyo").slideDown().toggleClass("hide");
  });

  // Submit & Create CYO Cards
  $("#cyo_submit").on("click", function(e) {
    e.preventDefault();
    cyo.createYourOwn(); // See cyo.js for this function
    selectTopic(cyo.flashcards_cyo, "#019875");
    $(window).scrollTo($("h1"), {
      duration: "2s",
      easing: "swing"
    });
  });

  // Add more CYO card inputs
  $(".addMore").on("click", function(e) {
    e.preventDefault();
    cyo.addMoreCYOCards();
  });

  // Make the plane fly!
  var plane = $(".fa-plane");

  plane.on("click", function(e) {
    e.preventDefault;
    plane.addClass("fly");
  });

  plane.on("mouseover", function(e) {
    plane.removeClass("fly");
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
      controls.flip();
    // 37 is left arrow
    } else if (e.which == 37 && e.target == document.body) {
      controls.prev();
    // 39 is right arrow
    } else if (e.which == 39 && e.target == document.body) {
      controls.next();
    // 82 is "R"
    } else if (e.which == 82 && e.target == document.body) {
      controls.resetFlashcards();
    // 81 is "Q"
    } else if (e.which == 81 && e.target == document.body) {
      controls.mixupCards();
    }
  });

  //Set Up Flashcards
  flashcard.setQuestions();

});

// Create flashcard object to contain functions.
// Event Listeners only work on document body. Still want to prevent from activating while in inputs...
