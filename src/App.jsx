import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  MapPin,
} from "lucide-react";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "13f356147310f4e3c698ca0cab51cc6b";

  const fetchWeatherData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      // Fetch hourly forecast
      const hourlyResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${API_KEY}&units=metric`
      );
      const hourlyData = await hourlyResponse.json();
      setHourlyForecast(hourlyData.list.slice(0, 6));
      setWeeklyForecast(
        hourlyData.list.filter((item, index) => index % 8 === 0).slice(0, 7)
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const detectLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case "clouds":
        return <Cloud className="w-16 h-16 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" &&
                fetchWeatherData(
                  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
                )
              }
              placeholder="Search for cities"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={detectLocation}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            <span className="hidden sm:inline">Detect Location</span>
          </button>
        </div>

        {weatherData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">{weatherData.name}</h1>
                <p className="text-gray-400">
                  Chance of rain: {weatherData.main.humidity}%
                </p>
                <div className="text-6xl font-bold mt-2">
                  {Math.round(weatherData.main.temp)}°
                </div>
              </div>
              <div>{getWeatherIcon(weatherData.weather[0].main)}</div>
            </div>

            {hourlyForecast && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h2 className="text-gray-400 mb-4">TODAY'S FORECAST</h2>
                <div className="grid grid-cols-6 gap-4">
                  {hourlyForecast.map((hour, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm mb-2">{formatTime(hour.dt)}</div>
                      <div className="mb-2">
                        {getWeatherIcon(hour.weather[0].main)}
                      </div>
                      <div className="text-xl">
                        {Math.round(hour.main.temp)}°
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-400">AIR CONDITIONS</h2>
                <button className="text-blue-400 text-sm">See more</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <Thermometer className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-gray-400">Real Feel</div>
                    <div className="text-xl">
                      {Math.round(weatherData.main.feels_like)}°
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Wind className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-gray-400">Wind</div>
                    <div className="text-xl">
                      {(weatherData.wind.speed * 3.6).toFixed(1)} km/h
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Droplets className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-gray-400">Chance of rain</div>
                    <div className="text-xl">{weatherData.main.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Sun className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-gray-400">UV Index</div>
                    <div className="text-xl">3</div>
                  </div>
                </div>
              </div>
            </div>

            {weeklyForecast && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h2 className="text-gray-400 mb-4">7-DAY FORECAST</h2>
                <div className="space-y-4">
                  {weeklyForecast.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="w-24">
                        {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        {getWeatherIcon(day.weather[0].main)}
                        <span>{day.weather[0].main}</span>
                      </div>
                      <div>
                        {Math.round(day.main.temp_max)}/
                        {Math.round(day.main.temp_min)}°
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
