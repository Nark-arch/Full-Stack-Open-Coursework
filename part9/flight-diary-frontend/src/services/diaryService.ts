import axios from 'axios'
import { DiaryEntry } from '../utils/types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

const createDiary = async (newDiaryEntry: unknown) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiaryEntry)
  return response.data
}

export default { getDiaries, createDiary }
