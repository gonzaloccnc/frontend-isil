import { Button, Card, CardBody, CardFooter, Chip, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { PdfModal } from '../modals/PdfModal'
import { FormModal } from '../modals/FormModal'

const EvaluationCard = ({ role, type, startDate, endDate, file, isVisible, itsGroup }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenUpload, onOpen: onOpenUpload, onOpenChange: onOpenChageUpload, onClose: onCloseUpload } = useDisclosure()

  return (
    <>
      <Card>
        <CardBody>
          <div className='flex flex-wrap gap-2'>
            <Chip>
              {type}
            </Chip>
            <Chip>
              Fecha de inicio: {startDate}
            </Chip>
            <Chip>
              Fecha de expiración: {endDate}
            </Chip>

            {
              role === 'PROFESOR'
                ? <Chip>
                  Visibilidad: {isVisible ? 'Visible a los estudiantes' : 'No visible a los estudiantes'}
                </Chip>
                : null
            }

            <Chip>
              Tipo de entrega: {itsGroup ? 'Grupal' : 'Individual'}
            </Chip>
          </div>
        </CardBody>
        <CardFooter className='flex items-center gap-2'>
          <Button color='primary' onPress={onOpen}>
            Ver documento
          </Button>
          {
            role === 'PROFESOR'
              ? <Button color='secondary'>
                Ver entregas
              </Button>
              : <Button color='secondary' onPress={onOpenUpload}>
                Subir entrega
              </Button>
          }
        </CardFooter>
      </Card>

      <PdfModal
        file={file}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <FormModal
        isOpen={isOpenUpload}
        onOpenChange={onOpenChageUpload}
        title='Subir mi entrega'
      >
        <div onClick={onCloseUpload}>close</div>
      </FormModal>
    </>
  )
}

export default EvaluationCard
