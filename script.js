let weather = {
    apiKey: "b74b6d7c45665a1a9cf84a771c9c9d79",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      console.log(name, icon, description, temp, humidity, speed);
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed " + speed + " m/h";
    },
    search: function (city) {
      this.fetchWeather(city);
    },
    getLocation: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`
            )
              .then((response) => response.json())
              .then((data) => this.displayWeather(data));
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    weather.getLocation();
  });
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search(document.querySelector(".search-bar").value);
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search(document.querySelector(".search-bar").value);
    }
  });
  