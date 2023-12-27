import './App.css';
import React, { useState } from 'react';

const WeatherApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const apiKey = '80a00696acc0e2753e4fb91df78c644b';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const toggleDarkMode = () => {
   setDarkMode(!darkMode);
  };
  
  const handleSearch = () => {
    if (location) {
      fetchWeather(location);
    }
  };

  const fetchWeather = async (location) => {
    try {
      const response = await fetch(
        `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className={`ma-8 background-image ${darkMode ? 'invert' : ''}`}>
     <button className="btn btn-secondary" onClick={toggleDarkMode}>Toggle Dark Mode</button>

     <div className={`h-screen flex flex-col items-center justify-center ${darkMode ? 'invert' : ''}`}>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
          Weatherer: Simple React Weather App
        </h1>
      </div>
      <div className="items-center text-center glass card shadow-xl p-4">
        <label className="form-control w-full max-w-xs mb-6">
          <div className="label">
            <span className="label-text">Enter City Name here:</span>
          </div>
          <input
            className="input input-bordered w-full max-w-xs"
            placeholder="City Name"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button className="w-32 btn btn-primary mb-6" onClick={handleSearch}>
          Search
        </button>
        <div name="text" className="w-96 font-semibold">
          <p>{weatherData.name}</p>
          <p>{Math.round(weatherData.main?.temp)}°C</p>
          <p>{weatherData.weather?.[0]?.description}</p>
          <br />
        </div>
      </div>
     </div>
    </div>


  );
};

export default WeatherApp;
