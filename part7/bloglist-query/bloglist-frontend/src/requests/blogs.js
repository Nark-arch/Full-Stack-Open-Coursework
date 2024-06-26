import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => axios.get(baseUrl).then((res) => res.data)

const create = (newObject) =>
  axios
    .post(baseUrl, newObject, {
      headers: { Authorization: token },
    })
    .then((res) => res.data)

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  })

const update = ({ updateObject: updateObject, id: id }) =>
  axios.put(`${baseUrl}/${id}`, updateObject).then((res) => res.data)

export default { getAll, setToken, create, remove, update }
