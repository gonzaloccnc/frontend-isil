'use client'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { ContentItem } from './ContentItem'
import { useEffect } from 'react'
import { useAdminContext } from '@/hooks/useAdminContext'

export const AccordionW = ({ id }) => {
  const { getContents, contents } = useAdminContext()

  useEffect(() => {
    getContents(id)
  }, [id])

  return (
    <>
      <Accordion variant='splitted'>
        {
          contents?.data.map(x => (
            <AccordionItem
              key={x.id_content}
              aria-label={x.title}
              title={x.numOrder + ' - ' + x.title}
            >
              <ContentItem
                id={x.id_content}
                description={x.description}
                file={x.linkFile}
                title={x.title}
                numOrder={x.numOrder}
                idCourse={x.idCourse}
              />
            </AccordionItem>
          ))
        }
      </Accordion>
    </>
  )
}
