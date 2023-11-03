'use client'

import { UserContext } from '@/context/UserContext'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const AboutClass = () => {
  const { id } = useParams()
  const { classes } = useContext(UserContext)
  const classFind = classes.find(x => x.idClassroom === id)

  return (
    <section>
      <p>{classFind.nrc + ' - ' + classFind.courseName}</p>
      <p>{classFind.description}</p>
      <p>{classFind.campus}</p>
      <p>{classFind.startTime} - {classFind.endTime} - {classFind.schoolDay}</p>
    </section>
  )
}

export default AboutClass
