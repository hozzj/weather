function changeUnit(sUnit){
	currentUnit = weatherData.weatherConvert(sUnit)[3];
	$(".welcome").html("The current weather condition in " + weatherData.location.city + ", "
	+ weatherData.location.country + " is " + weatherData.weatherConvert(sUnit)[0] + currentUnit);
}

var json = {"coord":
{"lon":30,"lat":28.1},
"weather":
[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
"main":{"temp":295.592,"pressure":1005.78,"humidity":52,
"temp_min":295.592,"temp_max":295.592,"sea_level":1021.41,
"grnd_level":1005.78},"wind":{"speed":2.96,"deg":6.50076},
"clouds":{"all":0},"dt":1467604745,
"sys":{"message":0.0024,"country":"EG","sunrise":1467601698,"sunset":1467651635},
"id":360688,"name":"Muḩāfaz̧at al Minyā","cod":200};



