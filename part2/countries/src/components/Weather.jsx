const Weather = ({ country }) => {
  const imgUrl = `https://openweathermap.org/img/wn/${country.weather.weather[0].icon}@2x.png`;
  const imgAlt = `${country.weather.weather[0].description}`;
  return (
    <>
      <h1>Weather in {country.capital.toString()}</h1>{" "}
      <p>temperature {country.weather.main.temp} Celcius</p>
      <img src={imgUrl} alt={imgAlt} />
      <p>wind {country.weather.main.wind_speed} m/s</p>
    </>
  );
};

export default Weather;
