import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;

const getWeather = async (lat, lon) => {
  const url = baseUrl + `lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

  const request = axios.get(url);

  const response = await request;

  return response.data;
};

export default { getWeather };
