"use strict"
$(document).ready(function() {
  var userSelectedQuestions = flashcards1.questions.slice(0); // Use slice so the original array can remain intact.
  var currentQuestions = userSelectedQuestions.slice(0); // Use slice so the userSelectedQuestions array can be used as the refresh stack

  var flashcard = {
    questionIndex: 0,
    lastQuestionIndex: currentQuestions.length - 1,

    // Set Up Question On Flashcard
    setQuestions: function() {
      if (!$(".finishMsg").length) {
      this.clearPrevCard();
      this.resetCardSide();
      this.addText();
      }
    },

    // Update Cards Left in Stack
    updateCardsLeft: function() {
      this.lastQuestionIndex = currentQuestions.length - 1;
      $(".count").text(currentQuestions.length);
      flashcard.finishMsg();
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
      currentQuestions[flashcard.questionIndex].forEach(function(e, i) {
        if (i === 0) {
          $("#front_side").append("<p>" + currentQuestions[flashcard.questionIndex][i] + "</p>");
        } else {
          $("#back_side").append("<p>" + currentQuestions[flashcard.questionIndex][i] + "</p>");
        }

        // Reduce font size if more than 3 items on back
        if (i > 3) {
          $("#back_side p").css("font-size", "0.8rem");
        } else if (i > 2) {
          $("#back_side p").css("font-size", "1rem");
        }
      });
    },

    // Give user a message if they've emptied the stack
    finishMsg: function() {
      if (flashcard.lastQuestionIndex === -1) {
        flashcard.clearPrevCard();
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
      flashcard.clearPrevCard();
      currentQuestions = userSelectedQuestions.slice(0);
      flashcard.questionIndex = 0;
      flashcard.updateCardsLeft();
      flashcard.setQuestions();
    },

    // Randomize Cards
    randomCard: function() {
      controls.markComplete();
      flashcard.questionIndex = Math.floor(Math.random() * currentQuestions.length);
      flashcard.setQuestions();
    },

    // Go to Previous Flashcard
    prev: function() {
      controls.markComplete();
      if (flashcard.questionIndex === 0) {
        flashcard.questionIndex = flashcard.lastQuestionIndex;
      } else {
        flashcard.questionIndex--;
      }
      flashcard.setQuestions();
    },

    // Go to Next Flashcard
    nextCard: function() {
        if (flashcard.questionIndex >= flashcard.lastQuestionIndex) {
          controls.markComplete();
          flashcard.questionIndex = 0;
        } else if (!controls.markComplete()){
          flashcard.questionIndex++;
        }
      flashcard.setQuestions();
    },

    // Remove Question if "Mark Complete" Box is checked
    markComplete: function() {
      if ($("input:checked").length) {
        currentQuestions.splice(flashcard.questionIndex, 1);
        $("#mark_complete").prop("checked", false);
        flashcard.updateCardsLeft();
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


  var events = {

    plane: $(".fa-plane"),

    listen: function() {

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
        $(window).scrollTo($("#cyo"), {
          duration: "2s",
          easing: "swing"
        });
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
      this.plane.on("click", function(e) {
        e.preventDefault;
        plane.addClass("fly");
      });

      this.plane.on("mouseover", function(e) {
        plane.removeClass("fly");
      });

      //Keyboard Shortcuts
      $("body").keypress(function(e) {
        if (e.target != document.querySelector("input[type=text]")) {
          // 120 is "X"
          if (e.which == 120) {
            $("#mark_complete").prop("checked", true);
          // 122 is "Z"
          } else if (e.which == 122) {
            $("#mark_complete").prop("checked", false);
          }
        }
      });

      $("body").keyup(function(e) {
        if (e.target != document.querySelector("input[type=text]")) {
          // 70 is "F""
          if (e.which == 70 ) {
            controls.flip();
          // 37 is left arrow
          } else if (e.which == 37) {
            controls.prev();
          // 39 is right arrow
          } else if (e.which == 39) {
            controls.nextCard();
          // 82 is "R"
          } else if (e.which == 82) {
            controls.resetFlashcards();
          // 81 is "Q"
          } else if (e.which == 81) {
            controls.randomCard();
          }
        }
      });
    }
  }

  //Set Up Flashcards
  flashcard.setQuestions();
  events.listen();
});
