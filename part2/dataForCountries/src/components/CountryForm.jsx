const CountryForm = ({ filter, changeHandler }) => {
  return (
    <div>
      find countries :
      <input value={filter} onChange={changeHandler} />
    </div>
  );
};

export default CountryForm;
