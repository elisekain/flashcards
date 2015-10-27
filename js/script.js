"use strict"
$(document).ready(function() {
  var userSelectedQuestions = flashcards1.questions.slice(0);
  var currentQuestions = userSelectedQuestions.slice(0);

  var flashcard = {
    self: this,
    questionIndex: 0,
    lastQuestionIndex: currentQuestions.length - 1,

    // Set Up Question On Flashcard
    setQuestions: function() {
      this.updateCardsLeft();
      this.clearPrevCard();
      this.resetCardSide();
      this.addText();
    },

    // Update Cards Left in Stack
    updateCardsLeft: function() {
      this.lastQuestionIndex = currentQuestions.length - 1;
      $(".count").text(currentQuestions.length);
    },

    // Clear Previous Card Text and Styling
    clearPrevCard: function() {
      $("#back_side").html("");
      $("#front_side").html("");
      $("#back_side").css("font-size", "1.5rem");
    },

    // Hide Back Side of Card; Show Front Side
    resetCardSide: function() {
      $("#back_side").addClass("hide");
      $("#front_side").removeClass("hide");
    },

    // Append text to front and back sides.
    addText: function() {
      if (!flashcard.finishMsg()) {
        currentQuestions[flashcard.questionIndex].forEach(function(e, i) {
          if (i === 0) {
            $("#front_side").append("<p>" + currentQuestions[flashcard.questionIndex][i] + "</p>");
          } else {
            $("#back_side").append("<p>" + currentQuestions[flashcard.questionIndex][i] + "</p>");
          }

          // Reduce font size if more than 2 items on back
          if (i > 2) {
            $("#back_side").css("font-size", "1rem");
          }
        });
      }
    },

    // Give user a message if they've emptied the stack
    finishMsg: function() {
      if (flashcard.lastQuestionIndex === -1) {
        $("#front_side").append("<p class='finishMsg'>You've completed this flashcard stack!<br> Press 'R' to reset</p>");
        return true;
      } else {
        return false;
      }
    }
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
      flashcard.questionIndex = 0;
      flashcard.lastQuestionIndex = currentQuestions.length - 1;
      flashcard.setQuestions();
    },

    // Randomize Cards
    randomCard: function() {
      this.markComplete();
      flashcard.questionIndex = Math.floor(Math.random() * currentQuestions.length);
      flashcard.setQuestions();
    },

    // Go to Previous Flashcard
    prev: function() {
      this.markComplete();
      if (flashcard.questionIndex === 0) {
        flashcard.questionIndex = flashcard.lastQuestionIndex;
      } else {
        flashcard.questionIndex--;
      }
      flashcard.setQuestions();
    },

    // Go to Next Flashcard
    nextCard: function() {
      if (!this.markComplete()) {
        if (flashcard.questionIndex === flashcard.lastQuestionIndex) {
          flashcard.questionIndex = 0;
        } else {
          flashcard.questionIndex++;
        }
      }
      flashcard.setQuestions();
    },

    // Remove Question if "Mark Complete" Box is checked
    markComplete: function() {
      if ($("input:checked").length) {
        currentQuestions.splice(flashcard.questionIndex, 1);
        $("#mark_complete").prop("checked", false);
        return true;
      }
    },

    // Select New Topic
    selectTopic: function(topicName, topBorderColor) {
      userSelectedQuestions = topicName.questions.slice(0);
      $(".topic").text(topicName.topic);
      $("#flashcard").css("border-top-color", topBorderColor);
      this.resetFlashcards();
    }
  }

  //Event Listeners
  $("#flip").on("click", controls.flip);
  $("#next").on("click", controls.nextCard);
  $("#prev").on("click", controls.prev);
  $("#random").on("click", controls.randomCard);
  $("#reset").on("click", controls.resetFlashcards);

  //Switch to Topic 1
  $(".topic1").on("click", function() {
    controls.selectTopic(flashcards1, "#F64747");
  });

  //Switch to Topic 2
  $(".topic2").on("click", function() {
    controls.selectTopic(flashcards2, "#F39C12");
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
    controls.selectTopic(cyo.flashcards_cyo, "#019875");
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
    if (e.which == 120 && e.target != document.querySelector("input[type=text]")) {
      $("#mark_complete").prop("checked", true);
    // 122 is "Z"
    } else if (e.which == 122 && e.target != document.querySelector("input[type=text]")) {
      $("#mark_complete").prop("checked", false);
    }
  });

  $("body").keyup(function(e) {
    // 70 is "F""
    if (e.which == 70 && e.target != document.querySelector("input[type=text]")) {
      controls.flip();
    // 37 is left arrow
    } else if (e.which == 37 && e.target != document.querySelector("input[type=text]")) {
      controls.prev();
    // 39 is right arrow
    } else if (e.which == 39 && e.target != document.querySelector("input[type=text]")) {
      controls.nextCard();
    // 82 is "R"
    } else if (e.which == 82 && e.target != document.querySelector("input[type=text]")) {
      controls.resetFlashcards();
    // 81 is "Q"
    } else if (e.which == 81 && e.target != document.querySelector("input[type=text]")) {
      controls.randomCard();
    }
  });

  //Set Up Flashcards
  flashcard.setQuestions();

});

// Remaining global variables aren't being recognized within an object (flashcards)
// Put event listeners in object?
