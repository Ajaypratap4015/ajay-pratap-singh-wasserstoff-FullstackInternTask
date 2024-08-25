import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("C"); // Unit state, default is Celsius

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city !== "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setError("");
        setQuery("");
        fetchForecast(response.data.name);
      })
      .catch((error) => {
        console.log(error);
        setWeather({});
        setForecast([]);
        setError({ message: "City not found", query: query });
      });
  };

  const fetchForecast = (city) => {
    axios
      .get(
        `${apiKeys.base}forecast?q=${city}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        const dailyData = response.data.list.filter((reading) =>
          reading.dt_txt.includes("18:00:00")
        );
        setForecast(dailyData);
      })
      .catch((error) => {
        console.log(error);
        setForecast([]);
      });
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  const defaults = {
    color: "white",
    size: 64,
    animate: true,
  };

  const getWeatherIcon = (iconCode) => {
    const iconMapping = {
      "01d": "CLEAR_DAY",
      "01n": "CLEAR_NIGHT",
      "02d": "PARTLY_CLOUDY_DAY",
      "02n": "PARTLY_CLOUDY_NIGHT",
      "03d": "CLOUDY",
      "03n": "CLOUDY",
      "04d": "CLOUDY",
      "04n": "CLOUDY",
      "09d": "RAIN",
      "09n": "RAIN",
      "10d": "RAIN",
      "10n": "RAIN",
      "11d": "SLEET",
      "11n": "SLEET",
      "13d": "SNOW",
      "13n": "SNOW",
      "50d": "FOG",
      "50n": "FOG",
    };
    return iconMapping[iconCode] || "CLEAR_DAY";
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const convertTemperature = (tempCelsius) => {
    return unit === "C"
      ? tempCelsius
      : Math.round((tempCelsius * 9) / 5 + 32);
  };

  return (
    <div className="forecast">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={(e) => e.key === "Enter" && search(query)}
        />
        <div className="img-box" onClick={() => search(query)}>
          <img
            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
            alt="Search"
          />
        </div>
      </div>

      <div className="current-weather">
        {weather.main ? (
          <>
            <h3>
              {weather.name}, {weather.sys.country}
            </h3>
            <p>
              Temperature: {convertTemperature(Math.round(weather.main.temp))}°
              {unit}
            </p>
            <p>
              Min: {convertTemperature(Math.round(weather.main.temp_min))}°
              {unit}, Max: {convertTemperature(Math.round(weather.main.temp_max))}°
              {unit}
            </p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>
              Wind: {weather.wind.speed} m/s, {weather.wind.deg}°
            </p>
            <p>{weather.weather[0].description}</p>
            <button className="toggle-button" onClick={toggleUnit}>
              Toggle to {unit === "C" ? "Fahrenheit" : "Celsius"}
            </button>
            <ReactAnimatedWeather
              icon={getWeatherIcon(weather.weather[0].icon)}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </>
        ) : (
          error && <p>{error.query} - {error.message}</p>
        )}
      </div>

      <div className="forecast-weather">
        <h3>5-Day Forecast</h3>
        <div className="forecast-cards">
          {forecast.map((day, index) => (
            <div className="forecast-card" key={index}>
              <p>
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <ReactAnimatedWeather
                icon={getWeatherIcon(day.weather[0].icon)}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{convertTemperature(Math.round(day.main.temp))}°{unit}</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
