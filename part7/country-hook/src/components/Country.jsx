const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.data) {
    return <div>not found...</div>
  }

  const data = country.data

  return (
    <div>
      <h3>{data.name.common} </h3>
      <div>capital {data.capital.toString()} </div>
      <div>population {data.population}</div>
      <img
        src={data.flags.png}
        height="100"
        alt={`${country.data.flags.alt}`}
      />
    </div>
  )
}

export default Country
