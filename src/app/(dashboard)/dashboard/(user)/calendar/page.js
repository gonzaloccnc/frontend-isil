import { cookies } from 'next/headers'

const CalendarPage = async () => {
  const token = cookies().get('token')
  console.log(token)
  return (
    <div>page</div>
  )
}

export default CalendarPage
