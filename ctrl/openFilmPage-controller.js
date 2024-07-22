$(function () {
  const urlLocal = new URLSearchParams(window.location.search);
  const id = urlLocal.get("id");

  getBackdropLandingPage(homeBackdropId);

  id != null
    ? fetchMovieByID(id)
    : () => {
        throw new Error("ID cannot be null.");
      };

  function fetchMovieByID(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    $.getJSON(url, function (data) {
      displayDetailsCard(data, goToGenrePage);
    });
  }

  function fetchTrailerByID(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;
    $.getJSON(url, function (data) {
      const trailers = data.results.filter(
        (videos) => videos.type === "Trailer" && videos.site === "YouTube"
      );
      if (trailers.length > 0) {
        const trailer = trailers[0];
        console.log(trailer);
        $("#movie-trailer").html(`
          <iframe width="100%" height="500" src="https://www.youtube.com/embed/${trailer.key}?autoplay=1" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
        `);
      } else {
        $("#movie-trailer").text("No trailer found");
      }
    });
  }

  function displayDetailsCard(data, callback) {
    const duration = `${Math.floor(data.runtime / 60)}h ${Math.floor(
      data.runtime % 60
    )}m`;
    const genreLink = data.genres.map(
      (dataObjek) =>
        `<p class='genreSec subtitle' data-genre-id='${dataObjek.id}'>${dataObjek.name},</p>`
    );

    $("#movie-title").text(
      `${data.title} (${data.release_date.split("-")[0]})`
    );
    $("#movie-release-date").text(data.release_date);
    $("#movie-runtime").text(duration);
    $("#movie-poster").attr(
      "src",
      `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    );
    $("#movie-backdrop").attr(
      "src",
      `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`
    );
    $(".overview").text("Overview");
    $("#movie-overview").text(data.overview);
    $("#movie-genres").empty().append(genreLink);
    $("#backdrop").css({
      "background-image": `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`,
      "background-position": "center",
    });

    $("#trailer-end-point").on("click", function () {
      fetchTrailerByID(data.id);
    });

    if (callback) {
      callback();
    }
  }

  $("#trailer-modal").on("hidden.bs.modal", function () {
    $("#movie-trailer").html("");
  });

  moveDetailsLog();

  $(window).on("resize", function () {
    moveDetailsLog();
  });
});

function moveDetailsLog() {
  if ($(window).width() <= 767) {
    $("#details-log").appendTo("#details-log-placeholder");
  } else {
    $("#details-log").appendTo(".details-log");
  }
}
