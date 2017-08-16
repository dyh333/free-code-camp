var UID = "U35AA97C0B"; // 测试用 用户ID，请更换成您自己的用户ID
var KEY = "uxe3duk9qne0n0oa"; // 测试用key，请更换成您自己的 Key
var API = "http://api.seniverse.com/v3/weather/now.json"; // 获取天气实况
var API2 = "http://api.seniverse.com/v3/weather/daily.json"; // 获取天气实况
var LOCATION = "suzhou"; // 除拼音外，还可以使用 v3 id、汉语等形式

// 获取当前时间戳
var ts = Math.floor(new Date().getTime() / 1000);
// 构造验证参数字符串
var str = "ts=" + ts + "&uid=" + UID;

// 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
// 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
sig = encodeURIComponent(sig);
str = str + "&sig=" + sig;

// 构造最终请求的 url
var url_now = API + "?location=" + LOCATION + "&" + str;// + "&callback=jsonpCallback";
$.ajax({
	type : "get",
	url : url_now,
	dataType : "jsonp",
	jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
	jsonpCallback:"jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
	success : function(json){
		var weather = json.results[0];
		fillWeatherNowHtml(weather);

		loadWeekWeather();
	},
	error:function(jqXHR, textStatus, errorThrown){
		alert('fail');
	}
});


function loadWeekWeather(){
	var url_week = API2 + "?location=" + LOCATION + "&start=0&days=7" + "&" + str;
	$.ajax({
		type : "get",
		url : url_week,
		dataType : "jsonp",
		jsonp: "callback",
		jsonpCallback:"jsonpCallback",
		success : function(json){
			var weather = json.results[0];

			var wind = weather.daily[0].wind_direction + "风" + weather.daily[0].wind_scale + "级";
			$("#txt_wind").text(wind);

			fillWeatherWeekHtml(weather);
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('fail2');
		}
	});
}


function fillWeatherNowHtml(weather){
	Handlebars.registerHelper('formatTime', function(date, format) {
		return moment(date).format(format);
	  });


	var source   = $("#weather-now-template").html();
	var template = Handlebars.compile(source);
	var html = template(weather);
	$("#weather_now").html(html);
}

function fillWeatherWeekHtml(weather){
	var source   = $("#item-inner-template").html();
	var template = Handlebars.compile(source);
	var html = template(weather);
	$("#week_box").html(html);
}