// Won't work on Chrome or Firefox
// Due to them disabling Mixed content (https&http)
// and also because the api has no alternate https connection
// Opera works fine

	var currentLatitude, currentLongitude, api,
	 lat, lon, key, apiRequest, weatherData, currentUnit;

	api = "http://api.openweathermap.org/data/2.5/weather";
	lat = "?lat=";
	lon = "&lon=";
	key = "&appid=560c314416cee6b04950e1f5415da8c5";
	apiRequest = [];
	weatherData = {

		currentTemp : 0,
		humidity : 0,
		minTemp : 0,
		maxTemp : 0,
		state : "",
		description: "",
		location : {
			country : "",
			city : ""
		},

		// to convert the Kelvin to other units
		weatherConvert: function(value){
					if(value.toLowerCase() === "kelvin"){
						return [Math.floor(this.currentTemp),
						Math.floor(this.minTemp),
						Math.floor(this.maxTemp), "K"];
					}
					else if(value.toLowerCase() === "celsius"){
						return [Math.floor(this.currentTemp - 273.15),
						Math.floor(this.minTemp - 273.15),
						Math.floor(this.maxTemp - 273.15), "C"];
					}
					else if (value.toLowerCase() === "fahrenheit"){
						return [Math.floor((this.currentTemp * (9/5) ) - 459.67),
						Math.floor((this.minTemp * (9/5) ) - 459.67),
						Math.floor((this.maxTemp * (9/5) ) - 459.67), "F"];
					}
		},
		getWeatherState: function(){
			if(this.currentTemp <= 288.15){ return ["freezing", "#009688"];}
			else if(this.currentTemp > 288.15&&this.currentTemp <= 298.15){ return ["cold", "#8ad0ce"];}
			else if(this.currentTemp > 298.15&&this.currentTemp <= 308.15){ return ["nice", "#bdf7ff"];}
			else if(this.currentTemp > 308.15&&this.currentTemp <= 313.15){ return ["hot", "#ffe963"];}
			else if(this.currentTemp > 313.15){ return ["hell", "#ff6d6d"];}
		}
	};

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



				weatherData.currentTemp = Math.floor(json.main.temp);
				weatherData.location.country = json.sys.country;
				weatherData.location.city = json.name;
				weatherData.state = json.weather[0].main;
				weatherData.description = json.weather[0].description;
				weatherData.humidity = json.main.humidity;
				weatherData.minTemp = json.main.temp_min;
				weatherData.maxTemp = json.main.temp_max;

				function changeUnit(sUnit){
					currentUnit = weatherData.weatherConvert(sUnit)[3];
					$(".welcome").html( weatherData.location.city + ", "
					+ weatherData.location.country);
					$(".temp").html(weatherData.weatherConvert(sUnit)[0] + "&deg;" + currentUnit);
				}
				
				changeUnit("celsius");				
				$("#celsius").click(function(){changeUnit("celsius");});
				$("#fahrenheit").click(function(){changeUnit("fahrenheit");});
				$("#kelvin").click(function(){changeUnit("kelvin");});
				$(".desc").html(weatherData.description);
				$(".ellipse").css("background-color", weatherData.getWeatherState()[1]);
				$(".temp-desc").html(weatherData.getWeatherState()[0]);
