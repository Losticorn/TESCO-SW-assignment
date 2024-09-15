import { useSearchContext } from "../providers/SearchProvider";
import { useState, useRef, useEffect, useMemo } from "react";
import useCities from "../hooks/useCities";
import useDebounce from "../hooks/useDebounce";
import GeolocationButton from "./GeolocationButton";

export default function SearchPlace() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1); // Tracks the active item in the list
  const { findPlace } = useSearchContext();
  const cities = useCities();
  const dropdownRef = useRef(null);

  const debouncedInputValue = useDebounce(inputValue, 300);
  const filteredCities = useMemo(() => {
    if (debouncedInputValue) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().startsWith(debouncedInputValue.toLowerCase())
      );
      if (filtered.length > 0) {
        setIsOpen(true);
      }
      setActiveIndex(-1); // Reset active index when input changes
      return filtered;
    }
    return [];
  }, [debouncedInputValue]);

  // Submit handler for searching based on city name input or geolocation
  const onSubmit = (event) => {
    event.preventDefault();
    const city = cities.find(
      (city) => city.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (city) {
      findPlace({ lat: city.coord.lat, lon: city.coord.lon });
    }
    setInputValue(""); // Clear the input after submission
  };

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleOptionClick(city) {
    setInputValue(city.name);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < filteredCities.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      setInputValue(filteredCities[activeIndex].name);
      setIsOpen(false);
      e.preventDefault();
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="wrapper">
      <form onSubmit={onSubmit} className="search-place-wrapper">
        <div className="input-wrapper">
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Zadejte místo"
          />
          {isOpen && (
            <ul className="list" ref={dropdownRef}>
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(city)}
                  className={
                    index === activeIndex ? "active" : "filtered-option"
                  }
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="search">
          Hledat
        </button>
      </form>
      <GeolocationButton />
    </div>
  );
}
