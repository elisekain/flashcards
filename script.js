$(document).ready(function() {

// Flip Flashcard
var flip = function() {
  $("#back_side").toggleClass("hide");
  $("#front_side").toggleClass("hide");
}

//Event Listeners
$("#flip").on("click", flip);

});

// Create flashcard object to contain functions.
