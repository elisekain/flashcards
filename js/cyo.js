var flashcards_cyo = {};
var cardNumber = 1;

var createYourOwn = function() {
  flashcards_cyo = {};
  flashcards_cyo.topic = $("input[name='cyo_topic']").val();
  flashcards_cyo.questions = [];
  $(".card_entries").each(function(i) {
    var thisCardContent = [];
    if ($(".card_entries .front").eq(i).val() && $(".card_entries .back").eq(i).val()) {
      thisCardContent.push($(".card_entries .front").eq(i).val());
      thisCardContent.push($(".card_entries .back").eq(i).val());
      flashcards_cyo.questions.push(thisCardContent);
    }
  })
}

var addMoreCYOCards = function() {
  for (var i = 0; i < 5; i++) {
    $(".cyo_cards").append("<div class='card_entries'><label for='front" + cardNumber + "'>Card &#35;" + cardNumber + "</label><input type='text' class='front' name='front1" + cardNumber + "' placeholder='Front'><input type='text' class='back' name='back" + cardNumber + "' placeholder='Back'></div>");
    cardNumber++;
  }
}
