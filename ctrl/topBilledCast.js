function getBilledCast(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;
    const data = {
        language: "en-US",
        api_key: apiKey,
    };

    $.getJSON(url, data, (response) => {
        response.cast.forEach(data => appendBilledCast(data));
    }).fail((jqXHR, statusText, errorThrown) => {
        const errorHeader = errorThrown || "error bang";
        console.error(errorHeader, statusText, jqXHR.responseText);
    });
}

function appendBilledCast(data) {
    const photoCast = data.profile_path ? `<img src='https://image.tmdb.org/t/p/w200/${data.profile_path}' alt='${data.name}'>` : '';
    var card = `<div id='movie-${data.id}' class='scroll-item col-lg-2 col-md-4 col-sm-4 col-4 mb-4' style='height: fit-content'>
                        <div class='billed movie-card card h-100'>
                            ${photoCast}
                            <div class='card-body ps-0'>
                                <p> ${data.name} <br>
                                ${data.character}</p>
                            </div>
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
