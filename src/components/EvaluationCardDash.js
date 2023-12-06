'use client'

import { Button, Chip, useDisclosure } from '@nextui-org/react'
import { PdfModal } from './modals/PdfModal'

export const EvaluationCardDash = ({ type, startDate, endDate, file }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  return (
    <article className='w-40 bg-primary flex flex-col justify-center gap-4 rounded-md p-4 h-full'>
      <p>{type}</p>
      <Chip>{startDate}</Chip>
      <Chip>Fin: {endDate}</Chip>
      <Button color='secondary' onPress={onOpen}>
        Ver documento
      </Button>
      <PdfModal
        file={file}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </article>
  )
}
