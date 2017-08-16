$(document).ready(function() {
  loadQuote();

  $("#new_quote").click(function() {
    loadQuote();
  });

  function loadQuote() {
    var color =
      "rgb(" +
      parseInt(Math.random() * 255) +
      ", " +
      parseInt(Math.random() * 255) +
      ", " +
      parseInt(Math.random() * 255) +
      ")";

    $.ajax({
      headers: {
        "X-Mashape-Key": "U1VaCvBkp9mshSRwm9UVB3dhb4iLp1OflwRjsno0d3vsBG6OBM",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url:
        "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
      success: function(r) {
        updateWBShare(r.quote);

        $("#quote_text").animate(
          {
            opacity: 0
          },
          500,
          function() {
            $(this).animate(
              {
                opacity: 1
              },
              500
            );
            $("#quote_text").text(r.quote);
          }
        );

        $("#author_text").animate(
          {
            opacity: 0
          },
          500,
          function() {
            $(this).animate(
              {
                opacity: 1
              },
              500
            );
            $("#author_text").text("-" + r.author);
          }
        );

        $("body").css("background-color", color);
        $("#new_quote").css("background-color", color);
        $("#share a").css("color", color);
      }
    });
  }

  function updateWBShare(text) {
    var wb_url = document.URL;
    var wb_language = "zh_cn";
    var wb_title = text;

    var wb_href =
      "http://service.weibo.com/share/share.php?" +
      "url=" +
      wb_url +
      "&language=" +
      wb_language +
      "&title=" +
      wb_title;

    $("#weibo_share").attr("href", wb_href);
  }
});
