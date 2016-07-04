//Won't work on the latest versions
// of Chrome or Firefox

var currentLatitude , currentLongitude, api, lat, lon, key, apiRequest, weatherData;

api = "http://api.openweathermap.org/data/2.5/weather";
lat = "?lat=";
lon = "&lon=";
key = "&appid=560c314416cee6b04950e1f5415da8c5";
apiRequest = [];
//weatherData container 
weatherData = {

	// to convert the Kelvins
	weatherConvert: function(value){
				if(value.toLowerCase() === "kelvin"){
					currentTemp = Math.floor(this.currentTemp);
					minTemp = Math.floor(this.minTemp);
					maxTemp = Math.floor(this.maxTemp);
				}
				else if(value.toLowerCase() === "celsius"){
					currentTemp = Math.floor(this.currentTemp - 273.15);
					minTemp = Math.floor(this.minTemp - 273.15);
					maxTemp = Math.floor(this.maxTemp - 273.15);
				}
				else if (value.toLowerCase() === "fahrenheit"){
					currentTemp = Math.floor((this.currentTemp * (9/5) ) - 459.67);
					minTemp = Math.floor((this.minTemp * (9/5) ) - 459.67);
					maxTemp = Math.floor((this.maxTemp * (9/5) ) - 459.67);
				}
				return 0;
			},

	// the raw Kelvin current temperature
	currentTemp : new Number(),

	// the user's location data
	location : {
		country : new String(),
		city : new String()
	},

	// if it's a cloudy or a clear sky 
	weatherState : {
		state : new String(),
		description: new String()
	},

	// it is descriptive =D
	miscData : {
		humidity : new Number(),
		minTemp : new Number(),
		maxTemp : new Number()
	}    
};


//check if the navigator api is available
if (navigator.geolocation) {

	// if so, get the position fo the user
	navigator.geolocation.getCurrentPosition(function(position) {

		// store the latitude and the longitude values
		currentLatitude = Math.floor(position.coords.latitude);
		currentLongitude = Math.floor(position.coords.longitude);
		apiRequest.push(api,lat,currentLatitude,lon,currentLongitude,key);
		//form the request
		apiRequest = apiRequest.join("");

		// send the coords and recieve the weather from the api
		$.getJSON( apiRequest, function(json) {

			//store the raw data for later processing
			weatherData.currentTemp = Math.floor(json.main.temp);
			weatherData.location.country = json.sys.country;
			weatherData.location.city = json.name;
			weatherData.weatherState.state = json.weather[0].main;
			weatherData.weatherState.description = json.weather[0].description;
			weatherData.miscData.humidity = json.main.humidity;
			weatherData.miscData.minTemp = json.main.temp_min;
			weatherData.miscData.maxTemp = json.main.temp_max;
			// post the raw weather data on the screen for testing
			$(".message").html(weatherData.weatherConvert("celsius"));
		});
	});
}
