import ReactTimeAgo from 'react-time-ago'

type Props = {
  date: Date
}

export default function LastSeen({ date }: Props) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="id-ID" timeStyle="twitter" />
    </div>
  )
}
