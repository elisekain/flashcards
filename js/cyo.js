var flashcards_cyo = {};

var createYourOwn = function() {
  flashcards_cyo = {};
  flashcards_cyo.topic = $("input[name='cyo_topic']").val();
  flashcards_cyo.questions = [];
  $(".card_entries").each(function(i) {
    var thisCardContent = [];
    thisCardContent.push($(".card_entries .front").eq(i).val());
    thisCardContent.push($(".card_entries .back").eq(i).val());
    flashcards_cyo.questions.push(thisCardContent);
  })
}
