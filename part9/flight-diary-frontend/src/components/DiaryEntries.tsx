import { DiaryEntry } from '../utils/types'
import Entry from './Entry'

const DiaryEntries = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => {
  return (
    <div>
      <h1> Diary Entries </h1>
      <ul>
        {diaryEntries.map((diaryEntry) => (
          <Entry key={diaryEntry.id} entry={diaryEntry} />
        ))}
      </ul>
    </div>
  )
}

export default DiaryEntries
