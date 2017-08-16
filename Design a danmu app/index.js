$(document).ready(function() {
  var time = 30000;

  var right = ($("body").width() - $("#screen").width()) / 2;

  $("#btn_push").click(function() {
    var span = $("<span/>");
    span.text($("#input_txt").val());

    var top = Math.random() * $("#screen").height();
    span.css("top", top);
    var font_size = Math.random() * 20 + 12;
    span.css("font-size", font_size);
    span.css(
      "color",
      "rgb(" +
        parseInt(Math.random() * 255) +
        ", " +
        parseInt(Math.random() * 255) +
        ", " +
        parseInt(Math.random() * 255) +
        ")"
    );

    $("#screen").append(span);

    span.animate({ right: right }, time, function() {
      $(this).remove();
    });
  });

  $("#btn_clear").click(function() {});
});
