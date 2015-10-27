var cyo = {

  // Set Up CYO variables
  flashcards_cyo: {},
  cardNumber: 1,

  // Get data to create CYO flashcard Stack
  createYourOwn: function() {
    this.flashcards_cyo = {};
    this.flashcards_cyo.topic = $("input[name='cyo_topic']").val();
    this.flashcards_cyo.questions = [];
    $(".card_entries").each(function(i) {
      var thisCardContent = [];
      if ($(".card_entries .front").eq(i).val() && $(".card_entries .back").eq(i).val()) {
        thisCardContent.push($(".card_entries .front").eq(i).val());
        thisCardContent.push($(".card_entries .back").eq(i).val());
        cyo.flashcards_cyo.questions.push(thisCardContent);
      }
    })
  },

  // Add more input fields for CYO
  addMoreCYOCards: function() {
    if (this.cardNumber < 50) {
      for (var i = 0; i < 5; i++) {
        $(".cyo_cards").append("<div class='card_entries'><label for='front" + this.cardNumber + "'>Card &#35;" + this.cardNumber + "</label><input type='text' class='front' name='front" + this.cardNumber + "' placeholder='Front'><input type='text' class='back' name='back" + this.cardNumber + "' placeholder='Back'></div>");
        this.cardNumber++;
      }
    }
  }
}
