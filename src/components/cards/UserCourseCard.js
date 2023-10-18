'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, useDisclosure } from '@nextui-org/react'
import { PdfModal } from '../modals/PdfModal'

export const UserCourseCard = ({ id, name, credits, description, syllabus, idStudent }) => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure()
  return (
    <>
      <Card>
        <CardHeader className='flex items-center gap-5'>
          <h2 className='text-primary-500'>{name}</h2>
          <Chip>
            {credits}
          </Chip>
        </CardHeader>
        <CardBody>
          <p>{description}</p>
        </CardBody>
        <CardFooter>
          <Button
            color='primary'
            onPress={onOpen}
          >
            Ver silabús
          </Button>
        </CardFooter>
      </Card>
      <PdfModal
        file={syllabus}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
