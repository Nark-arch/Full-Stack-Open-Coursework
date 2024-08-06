import { useState } from 'react'
import diaryService from '../services/diaryService'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../utils/types'
import Notify from './Notify'

const DiaryForm = ({
  diaryEntries,
  setDiaryEntries,
}: {
  diaryEntries: DiaryEntry[]
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const createDiary = async (event: React.SyntheticEvent) => {
    const newDiaryEntry: NewDiaryEntry = {
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
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        visibility :{' '}
        {Object.values(Visibility).map((value) => (
          <label key={value}>
            {value}
            <input
              name="visibility"
              type="radio"
              checked={visibility === value}
              value={value}
              onChange={() => setVisibility(value)}
            />
          </label>
        ))}
        <br />
        weather :{' '}
        {Object.values(Weather).map((value) => (
          <label key={value}>
            {value}
            <input
              name="weather"
              type="radio"
              checked={weather === value}
              value={value}
              onChange={() => setWeather(value)}
            />
          </label>
        ))}
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
