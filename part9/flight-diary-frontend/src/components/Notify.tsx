const Notify = ({ message }: { message: string | null }) => {
  if (!message) return null
  return <p style={{ color: 'red' }}>{message}</p>
}

export default Notify
