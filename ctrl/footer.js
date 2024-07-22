$(function () {
  $.get("/nestHood/movie/footer.html", function (data) {
    $("#footer").html(data);
  });
});
