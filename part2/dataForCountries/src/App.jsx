import { useEffect, useState } from "react";
import countriesService from "./services/countries";

import CountryForm from "./components/CountryForm";
import Countries from "./components/Countries";
import weatherService from "./services/weather";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [expandedCountries, setExpandedCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((response) => {
      console.log("promise fulfilled");
      setCountries(response);
    });
  }, []);

  useEffect(() => {
    const newFilteredCountries =
      countries === null
        ? null
        : countries.filter(
            (country) =>
              country.name.common.toLowerCase().includes(filter) ||
              country.name.official.toLowerCase().includes(filter)
          );
    setFilteredCountries(newFilteredCountries);
  }, [countries, filter]);

  const changeHandler = (event) => {
    const newFilter = event.target.value.toLowerCase();
    setFilter(newFilter);
  };

  const expandHandler = async (country) => {
    const weatherAddedCountry = await getWeatherAddedCountry(country);
    const newExpandedCountries = [...expandedCountries, weatherAddedCountry];

    setExpandedCountries(newExpandedCountries);
  };

  const getWeatherAddedCountry = async (country) => {
    const weather = await weatherService.getWeather(
      country.capitalInfo.latlng[0],
      country.capitalInfo.latlng[1]
    );

    const weatherprop = { weather: weather };

    const weatherAddedCountry = { ...country, ...weatherprop };

    const weatherAddedCountries = countries.map((c) =>
      c === country ? weatherAddedCountry : c
    );

    setCountries(weatherAddedCountries);

    return weatherAddedCountry;
  };

  return (
    <>
      <CountryForm search={filter} changeHandler={changeHandler} />
      <Countries
        countries={filteredCountries}
        expandedCountries={expandedCountries}
        expandHandler={expandHandler}
        weatherAddHandler={getWeatherAddedCountry}
      />
    </>
  );
};

export default App;
