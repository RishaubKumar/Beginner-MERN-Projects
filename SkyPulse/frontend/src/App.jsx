import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  // NOTE: No /api here (as you asked)
  const API_BASE = "http://localhost:3000/api";

  const fetchWeather = async (cityName) => {
    const q = cityName.trim();
    if (!q) return;

    setLoading(true);
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${API_BASE}/weather/${encodeURIComponent(q)}`),
        axios.get(`${API_BASE}/forecast/${encodeURIComponent(q)}`)
      ]);

      setWeather(weatherRes.data);

      // forecast JSON has list[] (like you shared)
      const list = Array.isArray(forecastRes.data?.list) ? forecastRes.data.list : [];
      setForecast(list.slice(0, 5));
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Request failed";
      alert(msg); // shows real reason instead of always "City not found" [web:110]
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="app">
      <header>
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (e.g., Delhi, Mumbai)"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </form>
      </header>

      {weather && (
        <main>
          <div className="current-weather">
            <h2>
              {weather.name}, {weather.sys?.country}
            </h2>

            <div className="temp-container">
              <img
                src={getIconUrl(weather.weather?.[0]?.icon)}
                alt="Weather icon"
              />
              <div>
                <p className="temp">{Math.round(weather.main?.temp)}°C</p>
                <p>{weather.weather?.[0]?.description}</p>
              </div>
            </div>

            <div className="details">
              <span>Humidity: {weather.main?.humidity}%</span>
              <span>Wind: {weather.wind?.speed} m/s</span>
            </div>
          </div>

          <div className="forecast">
            <h3>Next 5 Slots</h3>
            <div className="forecast-list">
              {forecast.map((item, idx) => (
                <div key={idx} className="forecast-item">
                  <p>
                    {new Date(item.dt * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <img src={getIconUrl(item.weather?.[0]?.icon)} alt="icon" />
                  <p>{Math.round(item.main?.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
