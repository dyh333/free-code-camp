$(document).ready(function() {
  $("#search img").click(function() {
    var search_txt = $("#search input").val().trim();

    wikipediaSearch(search_txt);
  });

  function wikipediaSearch(txt) {
    var wikiApi =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
    var page = "https://en.wikipedia.org/?curid=";

    $.ajax({
      type: "get",
      url: wikiApi + txt,
      dataType: "jsonp",
      jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
      jsonpCallback: "jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
      success: function(data) {
        var results = data.query.pages;

        var arr = new Array();
        _.forEach(results, function(value, key) {
          arr.push(value);
        });

        var source = $("#query-item-template").html();
        var template = Handlebars.compile(source);
        var html = template(arr);
        $("#result").html(html);

        $(".query-item").click(function() {
          var pageId = $(this).attr("data-v");
          window.open(page + pageId, "_blank");
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("fail");
      }
    });
  }
});
