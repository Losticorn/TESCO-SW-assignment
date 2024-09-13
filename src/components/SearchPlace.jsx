import { TbViewfinder } from "react-icons/tb";
import { useSearchContext } from "../providers/SearchProvider";
import { useState, useRef, useEffect } from "react";
import useCities from "../hooks/useCities";
import useGeolocation from "../hooks/useGeolocation";

export default function SearchPlace() {
  const [value, setValue] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // Tracks the active item in the list
  const { findPlace } = useSearchContext();
  const cities = useCities();
  const dropdownRef = useRef(null);
  const { myLocation, getGeolocation } = useGeolocation();

  // Submit handler for searching based on city name input or geolocation
  const onSubmit = (event) => {
    event.preventDefault();
    const city = cities.find(
      (city) => city.name.toLowerCase() === value.toLowerCase()
    );

    if (city) {
      findPlace({ lat: city.coord.lat, lon: city.coord.lon });
    } else if (myLocation) {
      // If location is available, try to use it to find a nearby city
      const nearestCity = findNearestCity(myLocation);
      if (nearestCity) {
        findPlace({ lat: nearestCity.coord.lat, lon: nearestCity.coord.lon });
      } else {
        console.log("No nearby city found.");
      }
    } else {
      console.log("City not found.");
    }

    setValue(""); // Clear the input after submission
  };

  // Function to find the nearest city based on geolocation (can be improved with better logic), 0.05 works fine, 0.001 doesn't work
  const findNearestCity = (location) => {
    return cities.find(
      (city) =>
        Math.abs(city.coord.lat - location.latitude) < 0.05 &&
        Math.abs(city.coord.lon - location.longitude) < 0.05
    );
  };

  function handleInputChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredCities(filtered);
      setActiveIndex(-1); // Reset active index when input changes
    } else {
      setFilteredCities([]);
    }
  }

  function handleOptionClick(city) {
    setValue(city.name);
    setFilteredCities([]);
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
      setValue(filteredCities[activeIndex].name);
      setFilteredCities([]);
      e.preventDefault();
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredCities([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle geolocation when user clicks the button
  function handleGeolocation() {
    getGeolocation();
  }

  // Update value when myLocation is available
  useEffect(() => {
    if (myLocation) {
      setValue(`${myLocation.latitude} ${myLocation.longitude}`);
    }
  }, [myLocation]);
  console.log(myLocation);

  return (
    <div className="wrapper">
      <form onSubmit={onSubmit} className="search-place-wrapper">
        <div className="input-wrapper">
          <input
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Zadejte místo"
          />
          {filteredCities.length > 0 && (
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
        <button type="submit" onClick={handleGeolocation} className="findme">
          <TbViewfinder color="white" size={50} />
        </button>
      </form>
    </div>
  );
}
