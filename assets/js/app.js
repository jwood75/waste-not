//Intialize Firebase==============================
var config = {
    apiKey: "AIzaSyA7kEuSq2h7vyLhysa9LUsvMjKlMGCKS7M",
    authDomain: "wastenot-bbf20.firebaseapp.com",
    databaseURL: "https://wastenot-bbf20.firebaseio.com",
    projectId: "wastenot-bbf20",
    storageBucket: "",
    messagingSenderId: "520424330024"
  };
  firebase.initializeApp(config);
//=================================================

//======GLOBAL VARIABLE============================
var database = firebase.database();
//=================================================

function searchRecipes() {

        $("#results").empty();
        
		var ingredient = $("#userInput").val();

    	var queryURL = "http://food2fork.com/api/search?key=07b37cdf5169c9dce5b9827628749701&q=" + ingredient;

    	$.ajax({

      		url: queryURL,
      		method: "GET"

    	}).done(function(response){

    		var recipes = JSON.parse(response).recipes;
            console.log(recipes);
    		for (var i = 0; i < recipes.length; i++) {

    			//will display intial search results==================================
    			var recipeDiv = $("<div>");
                recipeDiv.addClass("col-sm-4 text-center feature image-holder");

                var aContainer = $("<a href='#' target='blank'>");

                var imgHolder = $("<div class='background-image-holder overlay'>");

                var imgURL = recipes[i].image_url;
                var recipeImg = $("<img class='background-image'>").attr("src", imgURL);
                imgHolder.append(recipeImg);

                // Append .background-image-holder <img>'s as CSS backgrounds
                $('.background-image-holder').each(function() {
                    var imgSrc = $(this).children('img').attr('src');
                    $(this).css('background', 'url("' + imgSrc + '")');
                    $(this).children('img').hide();
                    $(this).css('background-position', '50% 50%');
                });
                
                // Fade in background images
                setTimeout(function(){
                    $('.background-image-holder').each(function() {
                        $(this).addClass('fadeIn');
                    });
                },200);

                aContainer.append(imgHolder);

                var textHolder = $("<div class='container' variant-clone-closest='.feature'>");

    			var recipeTitle = recipes[i].title;
    			var recipeTextDisplay = $("<h4 class='text-white'>").text(recipeTitle);
    			textHolder.append(recipeTextDisplay);

                var favBtn = $("<button id='favoriteBtn' type='submit'>").text("Add To Favorites!")
                textHolder.append(favBtn);

                aContainer.append(textHolder);
                recipeDiv.append(aContainer);

                var recipeURL = recipes[i].source_url;

                aContainer.attr("href", recipeURL);

    			$("#results").append(recipeDiv); 

    			//====================================================================

    		}//end for loop

    	}); //end .done function========

        $("#userInput").val(" ");
	}//end searchRecipes function

$(document).ready(function(){

    $("#searchIngredient").on("click", function(event){
        event.preventDefault();
        searchRecipes();
    });

    $("#favoriteBtn").on("click", function(){

        database.ref().push({

            recipeTitle: $(this).recipes[i].title,
        })
    });

});//end jQuery wrapper