$("button").on("click", function(){
    var athlete = $(this).attr("data-athlete");
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

            var p = $("<p>").text("Rating: " + rating);

            var athleteImage = $("<img>");

            athleteImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(athleteImage);

            $("#athleteGIFs").prepend(gifDiv);
        }
    });

    $(".gif").on("click", function(){
        var state = $(this).attr("data-state");
    
        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});

