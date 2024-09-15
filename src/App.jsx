import CurrentDayWeather from "./components/CurrentDayWeather";
import SearchPlace from "./components/SearchPlace";
import Forecast from "./components/Forecast";

function App() {
  return (
    <main className="layout">
      <SearchPlace />
      <CurrentDayWeather />
      <Forecast />
    </main>
  );
}

export default App;
