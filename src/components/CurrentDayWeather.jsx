export default function CurrentDayWeather({ currentWeather, currentDay }) {
  return (
    <div className="currentweather">
      <div>
        <h2>{currentWeather.name}</h2>
        <p>{currentDay}</p>
      </div>
      <div className="details">
        {currentWeather.main ? (
          <h1>{Math.round(currentWeather.main.temp)} °C</h1>
        ) : null}
        <div>
          <p>Zrážky</p>
          {currentWeather.main ? <p>{currentWeather.main.humidity}</p> : null}
        </div>
        <div>
          <p>Pocitová teplota</p>
          {currentWeather.main ? (
            <p>{Math.round(currentWeather.main.feels_like)} °C</p>
          ) : null}
        </div>
        <div>
          <p>Viditelnosť</p>
          {currentWeather.main ? <p>{currentWeather.visibility}</p> : null}
        </div>
      </div>
    </div>
  );
}
