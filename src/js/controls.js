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
