import { useEffect, useState } from 'react'
import { DiaryEntry } from './utils/types'
import diaryService from './services/diaryService'
import DiaryEntries from './components/DiaryEntries'
import DiaryForm from './components/DiaryForm'

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    diaryService.getDiaries().then((data) => {
      setDiaryEntries(data)
    })
  }, [])

  return (
    <div>
      <DiaryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
      />
      <DiaryEntries diaryEntries={diaryEntries} />{' '}
    </div>
  )
}

export default App
