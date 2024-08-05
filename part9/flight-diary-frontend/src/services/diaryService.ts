import axios from 'axios'
import { DiaryEntry } from '../utils/types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = () =>
  axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data)

export default { getDiaries }
