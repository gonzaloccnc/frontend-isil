'use client'
import { axiosClient } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { CardContent } from '@/components/cards/CardContent'
import { UserContext } from '@/context/UserContext'

export const ContentsClass = () => {
  const { id } = useParams()
  const { classes } = useContext(UserContext)
  const { data } = useSession()
  const [contents, setContents] = useState([])
  const classFind = classes.find(x => x.idClassroom === id)

  const fetchContents = async () => {
    try {
      const { data: contents } = await axiosClient.get(`/user/course/contents/${classFind.idCourse}`, {
        headers: {
          Authorization: `Bearer ${data.user.accessToken}`
        }
      })

      setContents(contents.data)
    } catch (ex) {
      console.error(ex)
    }
  }

  if (data == null) {
    return <h1>Cargando....</h1>
  }

  useEffect(() => {
    fetchContents()
  }, [])

  return (
    <section className='flex flex-col gap-4'>
      <p>{!contents.length && 'No hay contenidos para este curso'}</p>
      {
        contents.map(x => (

          <CardContent
            description={x.description}
            idContent={x.id_content}
            linkFile={x.linkFile}
            title={x.numOrder + ' - ' + x.title}
            key={x.id_content}
          />
        ))
      }
    </section>
  )
}
