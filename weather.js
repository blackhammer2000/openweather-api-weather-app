window.addEventListener("load", () => {
  getWeatherUpdate();
  let lat;
  let long;
  const API_KEY = "309a4d6f1c636492580c09c04eaa1aea";
  const getWeather = document.querySelector("[data-get-weather]");
  const weatherIcon = document.querySelector("[data-skycon]");
  const weatherCity = document.querySelector("[data-city]");
  const weatherCountry = document.querySelector("[data-country]");
  const temperatureValue = document.querySelector("[data-temperature]");
  const temperatureDescription = document.querySelector(
    "[data-temperature-description]"
  );

  getWeather.addEventListener("click", getWeatherUpdateEnter);

  function setIcon(icon, description) {
    function isDay() {
      return (
        ((Date.now() + 60000 * new Date().getTimezoneOffset() + 21600000) %
          86400000) /
          3600000 >
        12
      );
    }
    if (isDay) {
      switch (description) {
        case "Clouds":
          icon.src = "http://openweathermap.org/img/wn/04d@2x.png";
          break;
        case "Rain":
          icon.src = "http://openweathermap.org/img/wn/10d@2x.png";
          break;
        case "Clear":
          icon.src = "http://openweathermap.org/img/wn/01d@2x.png";
          break;
        case "Mist":
          icon.src = "http://openweathermap.org/img/wn/50d@2x.png";
          break;
        case "Snow":
          icon.src = "http://openweathermap.org/img/wn/13d@2x.png";
          break;
        case "Drizzle":
          icon.src = "http://openweathermap.org/img/wn/09d@2x.png";
          break;
        case "Thunderstorm":
          icon.src = "http://openweathermap.org/img/wn/11d@2x.png";
          break;
        default:
          icon.src = "http://openweathermap.org/img/wn/01d@2x.png";
          break;
      }
    } else {
      switch (description) {
        case "Clouds":
          icon.src = "http://openweathermap.org/img/wn/04n@2x.png";
          break;
        case "Rain":
          icon.src = "http://openweathermap.org/img/wn/10n@2x.png";
          break;
        case "Clear":
          icon.src = "http://openweathermap.org/img/wn/01n@2x.png";
          break;
        case "Mist":
          icon.src = "http://openweathermap.org/img/wn/50n@2x.png";
          break;
        case "Snow":
          icon.src = "http://openweathermap.org/img/wn/13n@2x.png";
          break;
        case "Drizzle":
          icon.src = "http://openweathermap.org/img/wn/09n@2x.png";
          break;
        case "Thunderstorm":
          icon.src = "http://openweathermap.org/img/wn/11n@2x.png";
          break;
        default:
          icon.src = "http://openweathermap.org/img/wn/01n@2x.png";
          break;
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function getWeatherUpdate(event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        //enable the proxy below when using dark sky API.
        //const proxy = "https://cors-anywhere.herokuapp.com";

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`;

        fetch(api)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            //console.log(data);
            const { description, main } = data.weather[0];
            const { feels_like } = data.main;
            const city = data.name;
            const { country } = data.sys;

            //set the DOM elements from the API.
            temperatureValue.textContent = feels_like;
            temperatureDescription.textContent = description;
            weatherCity.textContent = city;
            weatherCountry.textContent = country;
            setIcon(weatherIcon, main);
          })
          .catch((error) => console.error(error));
      });
    } else {
      document.write("Browser does not support location functionality.");
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function getWeatherUpdateEnter(event) {
    event.preventDefault();
    const cityName = document.querySelector("[data-city-name]").value;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

    if (cityName) {
      getresults();
    } else {
      document.write("City not available, try another one.");
    }

    function getresults() {
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //console.log(data);
          const { description, main } = data.weather[0];
          const { feels_like } = data.main;
          const city = data.name;
          const { country } = data.sys;

          //set the DOM elements from the API.
          temperatureValue.textContent = feels_like;
          temperatureDescription.textContent = description;
          weatherCity.textContent = city;
          weatherCountry.textContent = country;
          setIcon(weatherIcon, main);
        })
        .catch((error) => console.error(error));
    }
  }
});
