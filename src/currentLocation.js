import React from "react";
import apiKeys from "./apiKeys"; // Make sure apiKeys contains your API key and base URL
import Clock from "react-live-clock";
import ReactAnimatedWeather from "react-animated-weather";
import loader from "./images/WeatherIcons.gif";
import Forecast from "./forcast"; // Ensure you have this component

const dateBuilder = (d) => {
  let months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class CurrentLocation extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    country: undefined,
    temperatureC: undefined,
    main: undefined,
    icon: "CLEAR_DAY",
    errorMessage: undefined,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          this.getWeather(28.67, 77.22); // Fallback to a default location
          alert("Location services are disabled. Default location will be used.");
        }
      );
    } else {
      alert("Geolocation not available.");
    }
  }

  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();
    this.setState({
      lat,
      lon,
      city: data.name,
      country: data.sys.country,
      temperatureC: Math.round(data.main.temp),
      main: data.weather[0].main,
    });
    this.setWeatherIcon(data.weather[0].main);
  };

  setWeatherIcon = (main) => {
    const iconMapping = {
      Haze: "CLEAR_DAY",
      Clouds: "CLOUDY",
      Rain: "RAIN",
      Snow: "SNOW",
      Dust: "WIND",
      Drizzle: "SLEET",
      Fog: "FOG",
      Smoke: "FOG",
      Tornado: "WIND",
      Default: "CLEAR_DAY",
    };
    this.setState({ icon: iconMapping[main] || iconMapping.Default });
  };

  render() {
    return this.state.city ? (
      <div className="city">
        <div className="title">
          <h2>{this.state.city}</h2>
          <h3>{this.state.country}</h3>
        </div>
        <div className="mb-icon">
          <ReactAnimatedWeather
            icon={this.state.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <p>{this.state.main}</p>
        </div>
        <div className="date-time">
          <div className="dmy">
            <div className="current-time">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
            </div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
          <div className="temperature">
            <p>
              {this.state.temperatureC}°<span>C</span>
            </p>
          </div>
        </div>
        <Forecast icon={this.state.icon} weather={this.state.main} />
      </div>
    ) : (
      <div>
        <img src={loader} alt="Loading..." />
        <h3>Detecting your location...</h3>
        <p>Your current location will be used to calculate real-time weather.</p>
      </div>
    );
  }
}

export default CurrentLocation;
