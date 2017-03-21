$(document).ready(function() {

// Initial array of movies
var animals = ["Dog", "Cat", "Mouse", "Bird"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

	var animal = $(this).attr("animal-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	// Creating an AJAX call for the specific movie button being clicked
	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done(function(response) {

		var results = response.data;

		for (var i = 0; i < results.length; i++) {

		// Creating a div to hold the animal
		var animalDiv = $("<div class='animal'>");

		// Storing the rating data
		var rating = response.Rated;

		// Creating an element to have the rating displayed
		var p = $("<p>").text("Rating: " + results[i].rating);

		// Displaying the rating
		animalDiv.append(p);

		// Retrieving the URL of the image
		var imgURL = response.data.image_original_url;

		// Creating an element to hold the image
		var animalImage = $("<img>").attr("src", results[i].images.fixed_height.url);

		// Appending the image
		animalDiv.append(animalImage);

		// Putting the entire animal above the previous movies
		$("#animals").prepend(animalDiv);

		var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;

         var image = $('<img>');
       		image.attr('src',still);
            image.attr('data-still',still);
            image.attr('data-animated',animated);
            image.attr('data-state','still');
            image.addClass('searchImage');
		}
	});

}

$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');

            // If the clicked image's state is still, update its src attribute to animated.
              // Then, set the image's data-state to animated
              // Else set src to the data-state still value
            if(state ==='still'){
                $(this).attr('src', $(this).data('animated'));
                $(this).attr('data-state','animated'); 
            } else {
                $(this).attr('src',$(this).data('still'));
                $(this).attr('data-state','still');
            }
})

// Function for displaying animal data
function renderButtons () {

	// Deleting the animals prior to adding new animals
	// (this is necesary otherwise you will have repeat buttons)
	$("animalButtons").empty();

	//Looping through the array of animals
	for (var i = 0; i < animals.length; i++) {

		// Then dynamically generating buttons for each animal in the array
		// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
		var a = $("<button>");
		// Adding a class of animal to our button
		a.addClass("animal");
		// Adding a data-attribute
		a.attr("animal-name", animals[i]);
		// Providing the initial button text
		a.text(animals[i]);
		// Adding the button to the buttons-view div
		$("#animalButtons").append(a);
	}
}

//This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
	event.preventDefault();
	// This line grabs the input from the textbox
	var newAnimal = $("input").eq(0).val();
	console.log(newAnimal)

	// Adding animals from the textbox to the array
	animals.push(newAnimal);
	console.log(newAnimal)

	// Calling renderButtons which handles the processing of our animal array
	renderButtons();
});

// Adding a click event listerner to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalInfo);

// Calling the renderButtons function to display the inital buttons
renderButtons();

})






