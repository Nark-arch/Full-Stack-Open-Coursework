import { useState } from 'react'
import diaryService from '../services/diaryService'
import { DiaryEntry } from '../utils/types'
import Notify from './Notify'

const DiaryForm = ({
  diaryEntries,
  setDiaryEntries,
}: {
  diaryEntries: DiaryEntry[]
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const createDiary = async (event: React.SyntheticEvent) => {
    const newDiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    }

    event.preventDefault()
    const addedEntry = await diaryService
      .createDiary(newDiaryEntry)
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), 5000)
      })

    if (addedEntry) setDiaryEntries(diaryEntries.concat(addedEntry))
  }

  return (
    <div>
      <Notify message={errorMessage} />
      <form onSubmit={createDiary}>
        date :{' '}
        <input
          type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />{' '}
        <br />
        visibility :{' '}
        <input
          type="text"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />{' '}
        <br />
        weather :{' '}
        <input
          type="text"
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />{' '}
        <br />
        comment :{' '}
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />{' '}
        <br />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  )
}

export default DiaryForm
