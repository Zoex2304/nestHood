const apiKey = "e27f870d2a7a8c19b4a205727a369b84";
const homeBackdropId = "209112";

function directDetailCardFilm(card) {
  $(`${card}`).on("click", function () {
    var movieID = $(this).parent().attr("id").split("-")[1];
    window.location.href = `/movie/movie_detail.html?id=${movieID}`;
  });
}

function goToGenrePage() {
  $(".genreSec").on("click", function (e) {
    e.stopPropagation();
    var genre_id = $(this).data("genre-id");
    var genre_name = $(this).text();
    var genre = ["genreId=" + genre_id, "genreName=" + genre_name];
    window.location.href = "/movie/genre.html?" + genre.join("&");
  });
}

function getBackdropLandingPage(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  $.getJSON(url, function (data) {
    $("#landing-page").css(
      "background-image",
      `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`
    );
  });
}

function fetchGenres() {
  return $.getJSON(
    `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${apiKey}`
  );
}

getBackdropLandingPage(homeBackdropId);

let genres = {};

function appendContentMovie(segment, div1, div2) {
  $(function () {
    let movies = [];

    const baseUrl = `https://api.themoviedb.org/3/movie/${segment}`;
    const totalPage = 12;

    renderingMovie(movies);
    getBackdropLandingPage(homeBackdropId);

    function fetchMovie(page) {
      return $.getJSON(
        `${baseUrl}?language=en-US&page=${page}&api_key=${apiKey}`
      );
    }

    fetchGenres().done(function (response) {
      response.genres.forEach(function (genre) {
        genres[genre.id] = genre.name;
      });
      for (let page = 1; page <= totalPage; page++) {
        fetchMovie(page).done(function (data) {
          movies = movies.concat(data.results);
          if (page === totalPage) {
            renderingMovie(movies);
          }
        });
      }
    });

    function renderingMovie(movies) {
      movies = movies.slice(
        0,
        window.location.pathname.endsWith("/index.html") ? 13 : movies.length
      );

      let isMobileScreen = $(window).width() < 506;

      $(`${div1}`).empty();
      $(`${div2}`).empty();

      movies.forEach(function (data) {
        var poster = "https://image.tmdb.org/t/p/w200" + data.poster_path;
        var img_film = `<img class="poster img-fluid rounded-start" src='${poster}' alt="">`;

        var genreId = data.genre_ids;
        var genreName = genreId.map((id) => genres[id]);
        var genreLink = genreName
          .map(
            (name, index) =>
              `<p class='genreSec subtitle line-height' data-genre-id='${data.genre_ids[index]}'>${name},</p>`
          )
          .join("");

        var title = `<h3 class='card-text'>${data.title}</h3>`;
        var releaseDate = `<p class="card-text"><small class="text-white">${data.release_date.replace(
          /-/g,
          "/"
        )}</small></p>`;
        var description = `<p class="mobile-card-text card-text">${data.overview}</p>`;

        var mobileCard = `<div id='movie-${data.id}' class='scroll-item col-lg-2 col-md-4 col-sm-4 col-12 mb-4'>
                      <div class="movie-card card">
                          <div class="row g-0">
                              <div class="col-4 d-flex ">
                                  ${img_film}
                              </div>
                              <div class="col-8 bg-dark text-white d-flex align-items-center">
                                  <div class="card-body  d-flex justify-content-evenly h-100 flex-column">
                                     <div>
                                      ${title}
                                      ${releaseDate}
                                     </div>
                                      ${description}
                                      <div class='d-flex flex-wrap gap-1'>
                                      ${genreLink}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>`;

        var card = `<div id='movie-${data.id}' class=' ${(window.location.pathname.endsWith("/index.html")) ? "scroll-item"  : ""} col-lg-2 col-md-4 col-sm-4 col-4 mb-4' style='height: fit-content'>
                          <div class='movie-card card h-100'>
                              ${img_film}
                              <div class='card-body ps-0'>
                                  ${title}
                                  ${releaseDate}
                              </div>
                          </div>
                          <div class='d-flex flex-wrap gap-1'>
                            ${genreLink}
                          </div>
                      </div>`;
        $(`${div1}`).append(card);
        $(`${div2}`).append(isMobileScreen ? mobileCard : card);
      });

      directDetailCardFilm(".movie-card");
      goToGenrePage();
    }

    $(window).on("resize", function () {
      renderingMovie(movies);
    });
  });
} //documents ready
