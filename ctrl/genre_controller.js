$(function () {
  var url = new URLSearchParams(window.location.search);
  var id = url.get("genreId");

  if (id) {
    appendGenreGroup(id);
    $.get("/nestHood/movie/footer.html", function (data) {
      if ($("body").find("footer").length === 0) {
        $("body").append(data);
      }
    });
  }
});
