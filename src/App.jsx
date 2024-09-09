import { TbViewfinder } from "react-icons/tb";
import axios from "axios";
import { useState } from "react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [forecast, setForecast] = useState({});
  const [position, setPosition] = useState("");

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${position}&appid=${apiKey}&units=metric`;

  function findPlace(event) {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setForecast(response.data);
        console.log(response.data);
      });
      setPosition("");
    }
  }

  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay()];

  return (
    <main className="main">
      <div className="inputarea">
        <input
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          onKeyDown={findPlace}
          type="text"
          placeholder="Zadejte místo"
        ></input>
        <button className="search">Hledat</button>
        <button className="findme">
          <TbViewfinder size={50} />
        </button>
      </div>
      <div className="top">
        <div>
          <h2>{forecast.name}</h2>
          <p>{currentDay}</p>
        </div>
        <div className="details">
          {forecast.main ? <h1>{forecast.main.temp} °C</h1> : null}
          <div>
            <p>Zrážky</p>
            {forecast.main ? <p>{forecast.main.humidity}</p> : null}
          </div>
          <div>
            <p>Pocitová teplota</p>
            {forecast.main ? <p>{forecast.main.feels_like} °C</p> : null}
          </div>
          <div>
            <p>Viditelnosť</p>
            {forecast.main ? <p>{forecast.visibility}</p> : null}
          </div>
        </div>
      </div>

      <div className="forecast">
        <div className="day">
          <h1>Uterý</h1>
          <p>22°C</p>
          <p>50%</p>
        </div>
        <div className="day">
          <h1>Středa</h1>
          <p>22°C</p>
          <p>50%</p>
        </div>
        <div className="day">
          <h1>Čtvrtek</h1>
          <p>22°C</p>
          <p>50%</p>
        </div>
        <div className="day">
          <h1>Pátek</h1>
          <p>22°C</p>
          <p>50%</p>
        </div>
        <div className="day">
          <h1>Sobota</h1>
          <p>22°C</p>
          <p>50%</p>
        </div>
      </div>
      <div className="footer">
        <p>Footer</p>
      </div>
    </main>
  );
}

export default App;
