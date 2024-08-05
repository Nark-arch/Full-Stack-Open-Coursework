import { DiaryEntry } from '../utils/types'

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <li id={String(entry.id)}>
      <h3>{entry.date}</h3>
      <p>
        visibility: {entry.visibility} <br />
        weather: {entry.weather}
      </p>
    </li>
  )
}

export default Entry
