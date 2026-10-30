function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <p className="temp">{weather.temp}°</p>
      <p className="condition">{weather.condition}</p>

      <div className="details">
        <div>
          <span>💨 الرياح</span>
          <strong>{weather.wind} كم/س</strong>
        </div>
        <div>
          <span>💧 الرطوبة</span>
          <strong>{weather.humidity}%</strong>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard