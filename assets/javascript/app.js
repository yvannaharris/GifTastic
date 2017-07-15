var topics = ["dog", "cat", "rabbit", "hamster", 
"skunk", "goldfish", "bird", "ferret", "turtle", 
"sugar glider", "chinchilla", "hedgehog", "hermit crab", 
"gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", 
"serval", "salamander", "frog"];

function renderButtons() {
	//$("#animalbuttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("animal");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#animalbuttons").append(a);
	}
}

function getGIF() {
	var animal = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/?q" + animal + "&apikey=88ead5174f004521b5b5f37f78c4538a&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var resultsDiv = $("<div class='results'>");
		var rating = response.rating;
		var r =  $("<p>").text("Rating:" + rating);
		resultsDiv.append(r);

		var gifURLStill = response.fixed_height_still;
		var gifStill = $("<img>").attr("src", gifURLStill);
		resultsDiv.append(gifStill);
	});
}

renderButtons();
