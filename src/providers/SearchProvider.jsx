import { useState, useContext, createContext } from "react";
import useUserLanguage from "../hooks/useUserLanguage";
import axios from "axios";

const SearchContext = createContext(undefined);

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const weatherApi = "https://api.openweathermap.org/data/2.5";
const forecastCount = 5;
const units = "metric";

export default function SearchProvider({ children }) {
  const [currentWeather, setCurrentWeather] = useState(null);

  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const language = useUserLanguage();

  async function findPlace({ lat, lon }) {
    const currentWeatherUrl = `${weatherApi}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`;

    const forecastUrl = `${weatherApi}/forecast?lat=${lat}&lon=${lon}&cnt=${forecastCount}&appid=${apiKey}&units=${units}&lang=${language}`;
    try {
      await axios.get(currentWeatherUrl).then((response) => {
        setCurrentWeather(response.data);
        console.log("Current Weather:", response.data);
      });
    } catch (error) {
      console.error("Error fetching current weather:", error);
    }
    try {
      await axios.get(forecastUrl).then((response) => {
        setFiveDayForecast(response.data);
        console.log("Five Day Forecast:", response.data);
      });
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        findPlace,
        currentWeather,
        fiveDayForecast,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider.");
  }

  return context;
}
