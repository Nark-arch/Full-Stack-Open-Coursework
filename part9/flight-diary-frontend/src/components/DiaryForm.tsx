import { useState } from 'react'
import diaryService from '../services/diaryService'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../utils/types'

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

  const createDiary = (event: React.SyntheticEvent) => {
    const newDiaryEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
    }

    if (comment) newDiaryEntry.comment = comment

    event.preventDefault()
    diaryService
      .createDiary(newDiaryEntry)
      .then((data) => setDiaryEntries(diaryEntries.concat(data)))
  }

  return (
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
  )
}

export default DiaryForm
