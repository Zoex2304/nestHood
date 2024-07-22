$(document).ready(function () {
  $.get("/movie/navbar.html", function (data) {
    $("#navbar").html(data);

    removeSearchToggle();

    $(window).resize(function () {
      removeSearchToggle();
    });

    goToGenrePage()

  });

  function removeSearchToggle() {
    if ($(window).width() > 767) {
      $("#xs").removeAttr("data-bs-toggle", "collapse");
      $("#searchNav").removeClass("collapse");
    } else {
      $("#xs").attr("data-bs-toggle", "collapse");
      $("#searchNav").addClass("collapse");
    }
  }

  $(document).click(function (e) {
    var target = $(e.target);

    if (!target.closest("#searchNav").length && !target.closest("#xs").length) {
      if ($("#searchNav").hasClass("show")) {
        $("#searchNav").collapse("hide");
      }
    }

    if (!target.closest("#navbarNav").length) {
      if ($("#navbarNav").hasClass("show")) {
        $("#navbarNav").collapse("hide");
      }
    }
  });

  $("#searchForm").submit(function (event) {
    event.preventDefault();
    var query = $("#query").val().trim();
    window.location.href = "/movie/result.html?query=" + encodeURIComponent(query);
  });

 
});
