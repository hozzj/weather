// Won't work on Chrome or Firefox
// Opera works fine for me

var currentLatitude , currentLongitude, api, lat, lon, key, apiRequest, weatherData;

api = "http://api.openweathermap.org/data/2.5/weather";
lat = "?lat=";
lon = "&lon=";
key = "&appid=560c314416cee6b04950e1f5415da8c5";
apiRequest = new Array();
weatherData = {

	// to convert the Kelvin to other units
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

	currentTemp : new Number(),
	humidity : new Number(),
	minTemp : new Number(),
	maxTemp : new Number(),
	state : new String(),
	description: new String()

	location : {
		country : new String(),
		city : new String()
	},
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
			
			$(".message").html(weatherData.currentTemp);
		});
	});
}
