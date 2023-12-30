import Country from "./Country";
import FullCountry from "./FullCountry";

const Countries = ({
  countries,
  expandedCountries,
  expandHandler,
  weatherAddHandler,
}) => {
  if (!countries) {
    return null;
  }

  if (countries.length === 1 && countries[0].weather !== undefined) {
    return <FullCountry country={countries[0]} />;
  }

  if (countries.length === 1) {
    weatherAddHandler(countries[0]);
    return null;
  }

  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  return (
    <div>
      {countries.map((country, index) =>
        expandedCountries.includes(country) ? (
          <FullCountry key={index} country={country} />
        ) : (
          <Country
            key={index}
            country={country}
            expandHandler={expandHandler}
          />
        )
      )}
    </div>
  );
};

export default Countries;
