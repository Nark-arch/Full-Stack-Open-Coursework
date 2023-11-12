import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPersonObject) => {
  const request = axios.post(baseUrl, newPersonObject);
  return request.then((response) => response.data);
};

const deleteEntry = (personObject) => {
  const request = axios.delete(`${baseUrl}/${personObject.id}`)
  return request
}

const update = (editedObject) => {
  const request = axios.put(`${baseUrl}/${editedObject.id}`, editedObject)
  return request.then(response=> response.data)
}
export default { getAll, create, deleteEntry, update };
