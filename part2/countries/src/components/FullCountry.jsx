import Languages from "./Languages";

import Weather from "./Weather";

const FullCountry = ({ country }) => {
  const getCountryLanguages = (languages) => {
    const countryLanguages = [];
    for (const language in languages) {
      if (Object.hasOwnProperty.call(languages, language)) {
        countryLanguages.push(languages[language]);
      }
    }
    return countryLanguages;
  };
  return (
    <div>
      <h1>{country.name.common} </h1>
      <p>capital {country.capital.toString()}</p>
      {country.borders !== undefined ? (
        <p>area {country.borders.area}</p>
      ) : (
        <p>area {country.area}</p>
      )}

      <h2>languages:</h2>
      <ul>
        <Languages languages={getCountryLanguages(country.languages)} />
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather country={country} />
    </div>
  );
};

export default FullCountry;
