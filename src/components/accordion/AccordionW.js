'use client'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { ContentItem } from './ContentItem'

export const AccordionW = ({ items }) => {
  return (
    <>
      <Accordion variant='splitted'>
        {
          items.map(x => (
            <AccordionItem
              key={x.id}
              aria-label={x.title}
              title={x.order + ' - ' + x.title}
            >
              <ContentItem
                description={x.description}
                file={x.file}
                title={x.title}
              />
            </AccordionItem>
          ))
        }
      </Accordion>
    </>
  )
}
