import { useEffect, useState } from 'react'
import { DiaryEntry } from './utils/types'
import diaryService from './services/diaryService'
import Entry from './components/Entry'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    diaryService.getDiaries().then((data) => {
      setDiaryEntries(data)
    })
  }, [])

  return (
    <div>
      <h1> Diary Entries </h1>
      <ul>
        {diaryEntries.map((diaryEntry) => (
          <Entry entry={diaryEntry} />
        ))}
      </ul>
    </div>
  )
}

export default App
