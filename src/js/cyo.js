var cyo = {

  // Set Up CYO variables
  flashcards_cyo: {},
  cardNumber: 1,

  // Get data to create CYO flashcard stack
  createYourOwn: function() {
    var self = this;
    this.flashcards_cyo = {};
    this.flashcards_cyo.topic = $("input[name='cyo_topic']").val();
    this.flashcards_cyo.questions = [];

    $(".card_entries").each(function(i) {
      var frontSide = $(".card_entries .front").eq(i).val();
      var backSide = $(".card_entries .back").eq(i).val();
      self.addCustomCard(frontSide, backSide);
    });
  },

  addCustomCard: function(frontSide, backSide) {
    var cardContent = [];
    if (frontSide && backSide) {
      cardContent.push(frontSide);
      cardContent.push(backSide);
      cyo.flashcards_cyo.questions.push(cardContent);
    }
  },

  // Add more input fields for CYO
  addMoreCYOCards: function() {
    if (this.cardNumber < 50) {
    var addCard = Handlebars.getTemplate("addCard");
      for (var i = 0; i < 5; i++) {
        $(".cyo_cards").append(addCard({number: this.cardNumber}));
        this.cardNumber++;
      }
    }
  }
}
