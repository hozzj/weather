"use strict";
let api, lat, lon, apiRequest, weatherData, currentUnit;

api = "https://tamarack.herokuapp.com/weather";

weatherData = {
  currentTemp: 0,
  humidity: 0,
  minTemp: 0,
  maxTemp: 0,
  state: "",
  description: "",
  location: {
    country: "",
    city: ""
  }
};

const weatherConvert = (value) => {
  if (value == "celsius") {
    return `${Math.floor(weatherData.currentTemp - 273.15)}&deg;C`
  } else if (value == "fahrenheit") {
    return `${Math.floor((weatherData.currentTemp * (9 / 5)) - 459.67)}&deg;F`
  }
};

const getWeatherState = () => {
  if (weatherData.currentTemp <= 288.15) {
    return ["freezing", "#009688"];
  } else if (weatherData.currentTemp > 288.15 && this.currentTemp <= 298.15) {
    return ["cold", "#8ad0ce"];
  } else if (weatherData.currentTemp > 298.15 && this.currentTemp <= 308.15) {
    return ["nice", "#bdf7ff"];
  } else if (weatherData.currentTemp > 308.15 && this.currentTemp <= 313.15) {
    return ["hot", "#ffe963"];
  } else if (weatherData.currentTemp > 313.15) {
    return ["hell", "#ff6d6d"];
  }
};

const changeUnit = (unit) => {
  $(".temp").html(weatherConvert(unit));
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    apiRequest = (`${api}?lat=${lat}&lon=${lon}`);
    $.getJSON(apiRequest, function(json) {
      weatherData.currentTemp = Math.floor(json.main.temp);
      weatherData.location.country = json.sys.country;
      weatherData.location.city = json.name;
      weatherData.state = json.weather[0].main;
      weatherData.description = json.weather[0].description;
      weatherData.humidity = json.main.humidity;
      weatherData.minTemp = json.main.temp_min;
      weatherData.maxTemp = json.main.temp_max;
      $(".welcome").html(`${weatherData.location.city}, ${weatherData.location.country}`);
      changeUnit("celsius");
      $("#celsius").click(function() {
        changeUnit("celsius");
      });
      $("#fahrenheit").click(function() {
        changeUnit("fahrenheit");
      });
      $(".desc").html(weatherData.description);
      $(".ellipse, body").css("background-color", getWeatherState()[1]);
      $(".temp-desc").html(getWeatherState()[0]);
    });
  });
}
