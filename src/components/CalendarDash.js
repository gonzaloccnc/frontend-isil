'use client'

import Calendar from 'react-calendar'

export const CalendarDash = () => {
  return (
    <Calendar
      className='text-black h-full'
      minDate={new Date()}
    />
  )
}
