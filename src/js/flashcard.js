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

  // Reduce font size if >= 3 items on back
  adjustFontSize: function(i) {
    if (i > 3) {
      $("#back_side p").css("font-size", "0.8rem");
    } else if (i === 3) {
      $("#back_side p").css("font-size", "1rem");
    }
  },

  // Append text to front and back sides.
  addText: function() {
    var self = this;
    currentQuestions[flashcard.questionIndex].forEach(function(e, i) {
      if (i === 0) {
        $("#front_side").append("<p>" + currentQuestions[flashcard.questionIndex][i] + "</p>");
      } else {
        $("#back_side").append("<p>" + currentQuestions[flashcard.questionIndex][i] + "</p>");
      }
      self.adjustFontSize(i);
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
