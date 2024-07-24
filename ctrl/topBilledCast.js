function getBilledCast(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;
  const data = {
    language: "en-US",
    api_key: apiKey,
  };

  $.getJSON(url, data, (response) => {
    console.log(response)
    response.cast.forEach(data => 
        appendBilledCast(data)
    )
  }).fail((jqXHR, statusText, errorThrown) => {
    const errorHeader = errorThrown || "error bang";
    console.error(errorHeader, statusText, jqXHR.responseText);
  });
}

function appendBilledCast(data) {
  var photoCast = `<img src='https://image.tmdb.org/t/p/w200/${data.profile_path}'`;
  var nameCast = data.name;
  var charraccterCast = data.character;
  var card = `<div id='cast-${data.id} class='col-lg-2 col-md-3'>
        <div class='card billed-card billed-img-fluid rounded'>
            ${photoCast}
        </div>
    </div>`;
  $("#topBilledCast").append(card);
}

$(() => {
  const urlLocal = new URLSearchParams(window.location.search);
  const id = urlLocal.get("id");

  if (id) {
    getBilledCast(id);
  }
});
