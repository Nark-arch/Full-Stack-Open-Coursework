import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getByName = async (name) => {
  const request = axios.get(`${baseUrl}name/${name}`)
  const response = await request
  return response.data
}

export default { getByName }
