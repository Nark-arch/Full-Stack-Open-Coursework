const Country = ({ country, expandHandler }) => {
  return (
    <p>
      {" "}
      {country.name.common}{" "}
      <button onClick={() => expandHandler(country)}>Show</button>{" "}
    </p>
  );
};

export default Country;
