$(document).ready( function() {

var topics = ["dog", "cat", "rabbit", "hamster", 
"skunk", "goldfish", "bird", "ferret", "turtle", 
"sugar glider", "chinchilla", "hedgehog", "hermit crab", 
"gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", 
"serval", "salamander", "frog"];

function renderButtons() {
	$(".animalbuttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("animal");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$(".animalbuttons").append(a);
	}

	
}
renderButtons();

function getGIF() {
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=88ead5174f004521b5b5f37f78c4538a&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		$("#animals").empty();
		
		var results = response.data;
	
			for (var i = 0; i < results.length; i++) {
				var resultsDiv = $("<div class='results'>");
				var rating = results[i].rating.toUpperCase();
				var r =  $("<p>").text("Rating: " + rating);
				resultsDiv.append(r);

				var gifURLStill = results[i].images.fixed_height_still.url;
				var gifURLAnimate = results[i].images.fixed_height.url;
			
				var gifStill = $("<img>").attr("src", gifURLStill);
				gifStill.addClass("gif");
				gifStill.attr("data-state", "still");
				gifStill.attr("data-still-url", gifURLStill);
				gifStill.attr("data-animated-url", gifURLAnimate);

			
				resultsDiv.prepend(gifStill);
			

				$("#animals").append(resultsDiv);
			}

		$(".gif").on("click", function() {
			var state = $(this).attr("data-state");

				if( state === "still") {
					$(this).attr('src', $(this).attr("data-animated-url"));
					$(this).attr("data-state", "animate");
				
				} else {
					$(this).attr('src', $(this).attr("data-still-url"));
					$(this).attr("data-state", "still");
				
				}
		});
	});
	
};

$("#add-animal").on("click", function(event) {
	event.preventDefault();

	var newAnimal = $("#animal-input").val().trim().toLowerCase();
	
	topics.push(newAnimal);

	renderButtons();
});

$(document).on("click", ".animal", getGIF);



});


