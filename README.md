# Modern Weather Dashboard

A sleek, modern weather dashboard built with React that provides real-time weather information, hourly forecasts, and weekly predictions. The app features automatic location detection and supports manual city searches.

![Weather Dashboard Preview](/api/placeholder/800/400)

## Features

- 🌍 **Location-Based Weather**: Automatically detects user's location using HTML5 Geolocation API
- 🔍 **City Search**: Search weather information for any city worldwide
- ⏰ **Hourly Forecast**: View detailed weather predictions for the next 6 hours
- 📅 **7-Day Forecast**: Plan ahead with weekly weather predictions
- 🌡️ **Detailed Metrics**: 
  - Real-feel temperature
  - Wind speed
  - Precipitation chance
  - UV index
- 🎨 **Modern UI**: Clean, intuitive interface with responsive design

## Technologies Used

- React
- OpenWeather API
- HTML5 Geolocation API
- TailwindCSS
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Usage

### Automatic Location Detection

1. Click the "Detect Location" button next to the search bar
2. Allow location access when prompted by your browser
3. View weather information for your current location

### Manual City Search

1. Type a city name in the search bar
2. Press Enter or click the search button
3. View weather information for the searched city

## API Reference

This project uses the OpenWeather API for weather data. The following endpoints are used:

- Current Weather: `/data/2.5/weather`
- Forecast: `/data/2.5/forecast`

For more information, visit [OpenWeather API Documentation](https://openweathermap.org/api)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern weather applications

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.dev/dev-rohan72542/Weather-APP](https://github.dev/dev-rohan72542/Weather-APP)
