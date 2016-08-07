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

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

			currentLatitude = Math.floor(position.coords.latitude);
			currentLongitude = Math.floor(position.coords.longitude);

			apiRequest.push(api,lat,currentLatitude,lon,currentLongitude,key);
			apiRequest = apiRequest.join("");

			$.getJSON( apiRequest, function(json) {

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

			});
		});
	}
