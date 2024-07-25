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
    const photoCast = data.profile_path ? `<img src='https://image.tmdb.org/t/p/w1280/${data.profile_path}' alt='${data.name}'>` : '';
    const card = `
    <div id='billed-${data.id}' class='scroll-item fit-content col-lg-2 col-sm-3 col-3 col-md-2'>
        <div class='card movie-card'>
            ${photoCast}
            <div class='card-body'>
                <p>${data.name}</p>
                <p>${data.character}</p>
            </div>
        </div>
    </div>
    `
    
    $("#topBilledCast").append(card);
}

$(() => {
    const urlLocal = new URLSearchParams(window.location.search);
    const id = urlLocal.get("id");

    if (id) {
        getBilledCast(id);
    }
});
