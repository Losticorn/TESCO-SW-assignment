import daysOfWeek from "../constants/daysOfWeek";
import { useSearchContext } from "../providers/SearchProvider";

export default function Forecast() {
  const { fiveDayForecast } = useSearchContext();

  const currentDay = new Date().getDay();
  const forecastDays = daysOfWeek
    .slice(currentDay + 1, daysOfWeek.length)
    .concat(daysOfWeek.slice(0, currentDay));
  console.log(forecastDays);

  if (!fiveDayForecast) return null;

  return (
    <div className="forecast">
      {fiveDayForecast.list.map((item, index) => (
        <table className="forecast-table" key={index}>
          <tr>
            <th>{forecastDays[index]}</th>
          </tr>
          <tr>
            <td className="temperature">
              {Math.round(item.main.temp_max)} °C /{" "}
              {Math.round(item.main.temp_min)} °C
            </td>
          </tr>
          <tr>
            <td>
              <img
                alt="weather"
                className="icon"
                src={`icons/${item.weather[0].icon}.png`}
              />
            </td>
          </tr>
          <tr>
            <td>{item.weather[0].description}</td>
          </tr>
        </table>
      ))}
    </div>
  );
}
