import { useState } from "react";
import SearchBox from "./components/Searchbox";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const weatherCodes = {
  0: "سماء صافية ☀️",
  1: "غالباً صافي 🌤️",
  2: "غائم جزئياً ⛅",
  3: "غائم ☁️",
  45: "ضباب 🌫️",
  48: "ضباب كثيف 🌫️",
  51: "رذاذ خفيف 🌦️",
  53: "رذاذ 🌦️",
  55: "رذاذ كثيف 🌦️",
  61: "مطر خفيف 🌧️",
  63: "مطر 🌧️",
  65: "مطر غزير 🌧️",
  71: "ثلج خفيف 🌨️",
  73: "ثلج 🌨️",
  75: "ثلج كثيف ❄️",
  80: "زخات مطر 🌦️",
  81: "زخات مطر قوية 🌧️",
  82: "زخات عنيفة ⛈️",
  95: "عاصفة رعدية ⛈️",
  96: "عاصفة رعدية مع برَد ⛈️",
  99: "عاصفة رعدية قوية ⛈️",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (city.trim() === "") {
      setError("من فضلك اكتب اسم مدينة");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // الخطوة 1: نحول اسم المدينة لإحداثيات
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ar`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("المدينة مش موجودة، جرب اسم تاني");
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      // الخطوة 2: نجيب الطقس بالإحداثيات
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();

      const current = weatherData.current;

      setWeather({
        city: name,
        temp: Math.round(current.temperature_2m),
        condition: weatherCodes[current.weather_code] || "غير معروف",
        wind: current.wind_speed_10m,
        humidity: current.relative_humidity_2m,
      });
    } catch (err) {
      setError("حصل خطأ في الاتصال، تأكد من الإنترنت وجرب تاني");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>🌤️ تطبيق الطقس</h1>

      <SearchBox city={city} setCity={setCity} onSearch={handleSearch} />

      {loading && <p className="message">جاري التحميل...</p>}
      {error && <p className="message">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
