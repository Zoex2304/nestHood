$(function () {
  $.get("/nestHood/modal/trailer-modal.html", function (data) {
    $("#trailer-modal").html(data);
  });
});
