var plane = $(".fa-plane");
var events = {

  listen: function() {

    //Event Listeners
    $("#flip").click(controls.flip);
    $("#next").click(controls.nextCard);
    $("#prev").click(controls.prev);
    $("#random").click(controls.randomCard);
    $("#reset").click(controls.resetFlashcards);

    //Switch to Topic 1
    $(".topic1").click(function() {
      controls.selectTopic(flashcards1, "#F64747");
    });

    //Switch to Topic 2
    $(".topic2").click(function() {
      controls.selectTopic(flashcards2, "#F39C12");
    });

    // Show CYO Div
    $(".create_flashcards").click(function() {
      cyo.addMoreCYOCards();
      $("#cyo").slideDown().toggleClass("hide");
      $(window).scrollTo($("#cyo"), {
        duration: "2s",
        easing: "swing"
      });
    });

    // Submit & Create CYO Cards
    $("#cyo_submit").click(function(e) {
      e.preventDefault();
      cyo.createYourOwn();
      controls.selectTopic(cyo.flashcards_cyo, "#019875");
      $(window).scrollTo($("h1"), {
        duration: "2s",
        easing: "swing"
      });
    });

    // Add more CYO card inputs
    $(".addMore").click(function(e) {
      e.preventDefault();
      cyo.addMoreCYOCards();
    });

    // Make the plane fly!
    plane.click(function(e) {
      e.preventDefault;
      plane.addClass("fly");
    });

    plane.on("mouseover", function(e) {
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
