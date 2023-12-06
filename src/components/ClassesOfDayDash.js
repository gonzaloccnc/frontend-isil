'use client'

import { Chip } from '@nextui-org/react'

export const ClassesOfDayDash = ({ nrc, linkMeet, startTime, endTime }) => {
  return (
    <article className='flex flex-col gap-2 bg-dark-primary rounded-lg p-5'>
      <span>NRC: {nrc}</span>
      <span>Hora de inicio: <Chip>{startTime}</Chip></span>
      <span>Hora de finalización: <Chip>{endTime}</Chip></span>
      <div>
        <a
          href={linkMeet}
          target='_blank'
          rel='noreferrer'
          className='bg-secondary-300 rounded-md p-2'
        >
          Ir a la reunion
        </a>
      </div>
    </article>
  )
}
