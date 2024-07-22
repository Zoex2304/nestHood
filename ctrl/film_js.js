
function search(query,segment) {
    $.getJSON(
        `https://api.themoviedb.org/3/search/${segment}`,{
            query: query,
            include_adult: false,
            language: "en-US",
            page: 1,
            api_key: "e27f870d2a7a8c19b4a205727a369b84"
        },
        function (searchData) {
            if (searchData.results.length > 0) {
                $(".container-poster").empty();
                $("#xrs").empty();
                searchData.results.forEach(function (data) {
                    var poster = "https://image.tmdb.org/t/p/w200" + data.poster_path;
                    var img = '<img src="' + poster + '" class="card-img-top sizing" alt="' + data.title + '">';
                    var title = "<p class='card-title'>" + data.title + "</p>";

                    var card = `
                        <div id='movie-${data.id}' class='col-lg-2 col-md-2 col-sm-4 col-4 mb-4''>
                            <div class='movie-card card h-100'>
                                ${img}
                                <div class='card-body p-1'>
                                    ${title}
                                </div>
                            </div>
                        </div>
                    `;
                    $('#xrs').append(card);
                    directDetailCardFilm('.movie-card')
                });
            } else {
                $("#xrs").html("<p>No results found</p>");
            }
        }
    );
}
