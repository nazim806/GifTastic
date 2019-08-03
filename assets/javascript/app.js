// Variables for different animal gif
var animals = [ "cat","dog", "opossum", "hippo", "skunk", "shark", "albatross", "tiger", "turtle", "jaguar", "prairie dog", "hedgehog", "toucan", "deer", "donkey", "chicken", "caracal",  "iguana", "gazelle"];

// Functions declaration

	function renderButtons () {
		$(".animal-buttons").empty();
		for (var i = 0; i < animals.length; i++) {
			var newButton = $("<button>");
			newButton.addClass("animal btn btn-default");
			newButton.attr("data-name", animals[i]);
			newButton.text(animals[i]);
			$(".animal-buttons").append(newButton);
		}
	};

	$("#add-animal").on("click", function (event) {
		event.preventDefault();
		var animal = $("#animal-input").val().toLowerCase().trim();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=HvEpOUbGXXkd8jdPhbCqHfMovcxPKww1&limit=20";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

	        if (response.data.length == 0) {
	        	alert("No Gifs found for this");
	        }
			else if (animals.indexOf(animal) != -1) {
				alert("Animal already exists");
			}
			else {
				animals.push(animal);
				renderButtons();
			}

		});
	});

	function displayGifs () {
		var animal = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=HvEpOUbGXXkd8jdPhbCqHfMovcxPKww1&limit=20";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);

          $(".animal-view").empty();
          for (var i = 0; i < response.data.length; i++) {
          	var gifDiv = $("<div>");
          	gifDiv.addClass("gifDiv");
          	gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

          	var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          	gifImage.addClass("gif");

          	var imageDiv = $("<div>");
          	imageDiv.addClass("play");
          	imageDiv.attr("data-state", "still");
          	imageDiv.attr("data-name", animal);
          	imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
          	imageDiv.attr("data-animate",response.data[i].images.fixed_height.url)
          	
          	$(imageDiv).append(gifImage);
          	$(gifDiv).append(imageDiv);
          	$(".animal-view").append(gifDiv);
          }

        });
	};

	function playGif () {

		if ($(this).attr("data-state") == "still") {
			$(this).html("<img src='" + $(this).attr("data-animate") + "'>");
			$(this).attr("data-state", "animate");
		}
		else {
			$(this).html("<img src='" + $(this).attr("data-still") + "'>");
			$(this).attr("data-state", "still");
		}

	};


	$(document).on("click", ".animal", displayGifs);
	$(document).on("click", ".play", playGif);

//Running Code
renderButtons();