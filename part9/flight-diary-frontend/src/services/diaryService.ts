import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from '../utils/types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = () =>
  axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data)

const createDiary = (newDiaryEntry: NewDiaryEntry) =>
  axios
    .post<DiaryEntry>(baseUrl, newDiaryEntry)
    .then((response) => response.data)

export default { getDiaries, createDiary }
