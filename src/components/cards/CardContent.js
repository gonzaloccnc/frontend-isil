'use client'
import { PdfModal } from '@/components/modals/PdfModal'
import { Button, Card, CardBody, CardFooter, CardHeader, useDisclosure } from '@nextui-org/react'

export const CardContent = ({ idContent, title, description, linkFile }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Card key={idContent}>
        <CardHeader className='text-primary-500'>
          {title}
        </CardHeader>
        <CardBody>
          {description}
        </CardBody>
        <CardFooter>
          <Button
            onPress={onOpen}
            variant='bordered'
            color='primary'
            className='text-white'
          >
            Ir al documento
          </Button>
        </CardFooter>
      </Card>
      <PdfModal
        key={title + idContent}
        file={linkFile}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
