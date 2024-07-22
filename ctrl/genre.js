let genreHeader = "";

function defineHeader(id, callback) {
  fetchGenres().done(function (data) {
    data.genres.forEach(function (genre) {
      if (genre.id == id) {
        genreHeader = genre.name;
        $("#genreTitle").text(`All  ${genreHeader} film here`);
        if (callback) callback();
      }
    });
  });
}

function fetchAll(page, id) {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=en-US&page=${page}&api_key=${apiKey}`;
  $.getJSON(url, function (response) {
    response.results.forEach(function (data) {
      appendContentMovieResponse(data);
    });
  });
}

function appendGenreGroup(id) {
  const totalPages = 1;
  defineHeader(id, function () {
    for (let page = 1; page <= totalPages; page++) {
      fetchAll(page, id);
    }
  });
}

function appendContentMovieResponse(data) {
  var genreId = data.genre_ids;
  var genreName = genreId.map(id => genres[id])
  var genreLink = genreName.map((name,index ) => `<p class='genreSec subtitle line-height' data-genre-id=${genreId[index]}>${name},</p>`).join("")
  var releaseDate = `<p class="card-text"><small class="text-white">${data.release_date.replace(/-/g,"/")}</small></p>`;
  var poster = "https://image.tmdb.org/t/p/w200" + data.poster_path;
  var img_film = `<img class="poster img-fluid rounded-start" src='${poster}' alt="">`;
  var title = `<h3 class='card-text'>${data.title}</h3>`;

  const card = `<div id='movie-${data.id}' class=' col-lg-2 col-md-4 col-sm-4 col-4 mb-4' style='height: fit-content'>
                    <div class='movie-card card h-100'>
                            ${img_film}
                        <div class='card-body ps-0'>
                            ${title}
                            ${releaseDate}
                            <div class='d-flex gap-2 flex-wrap'>
                             ${genreLink}
                            </div>
                        </div>
                    </div>
                    <div class='d-flex flex-wrap gap-1'>
                </div>`;
  $("#genreBox").append(card);
  directDetailCardFilm(".movie-card");
}
