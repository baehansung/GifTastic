var athleteArr = ["Cristiano Ronaldo", "Lionel Messi", "Michael Jordan", "Kobe Bryant", "LeBron James", "Muhammad Ali", "Roger Federer", "Rafael Nadal", "Tom Brady", "Carson Wentz"];

function addAthleteButtons(){
    //delete movie buttons prior to adding to avoid repeat buttons
    $("#athleteGIFs").empty();

    //for loop to iterate over athleteArr variable
    for(var i = 0; i < athleteArr.length; i++){
        var append = $("<button type='button' class='btn btn-info'>");
        append.addClass("athName");
        append.attr("data-name", athleteArr[i]);
        append.text(athleteArr[i]);
        $("#athleteGIFs").append(append);
    }
};

//function to put user's Athlete in input box to the webpage as a clickable button to trigger GIFs
$("#add-athlete").on("click", function(event){
    //event.preventDefault() to prevent form from trying to submit itself
    event.preventDefault();

    //grab text from input box
    var addAthlete = $("#athlete-input").val().trim();
    athleteArr.push(addAthlete);

    addAthleteButtons();
});

addAthleteButtons();

//Clicking the button of an athlete will append GIFs to the page
function pushGIFs(){
    var athlete = $(this).attr("data-name");
    console.log(athlete);
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + "&api_key=YorKFzqJrMLyjl579IkUbSyAgntt27Dj" + "&q=" + athlete;
    console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response){
        var results = response.data;

        for (var i = 0; i < results.length; i++){
            var gifDiv = $("<div class='gif' id='item'>");
            var rating = results[i].rating;

            var p = $("<p class='text-white' style='margin-top:45px; font-size: 20px;'>").text("Rating: " + rating.toUpperCase());

            var athleteImage = $("<img>");

            athleteImage.attr("src", results[i].images.fixed_width.url);
            athleteImage.attr("data-animate", results[i].images.fixed_width.url);
            athleteImage.attr("data-still", results[i].images.original_still.url);

            gifDiv.append(p);
            gifDiv.append(athleteImage);

            $("#GIFs").prepend(gifDiv);
        }
    })
};

//Allows newly added athlete buttons that are added via the Search button, to be dynamic and also push GIFs
$(document).on("click", ".athName", pushGIFs);

//below document.on function still does not pause/play GIFs
$(document).on("click", "#item", function(){
    var state = $(this).attr('data-state');

    image = $(this).children('img').addClass("img");

    if(state === 'still'){
        $(image).attr('src', $(image).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(image).attr('src', $(image).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});


//trying to pause/play GIFs but not working...
    // $(".img").on("click", function(){
    //     var state = $(this).attr("data-state");
    
    //     if(state === "still") {
    //         $(this).attr("src", $(this).attr("data-animate"));
    //         $(this).attr("data-state", "animate");
    //         athleteImage.attr("src", results[i].images.fixed_height.url);
    //     } else {
    //         $(this).attr("src", $(this).attr("data-still"));
    //         $(this).attr("data-state", "still");
    //         athleteImage.attr("src", results[i].images.fixed_height_still.url);
    //     }
    // });
