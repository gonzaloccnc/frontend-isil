import { Button, Input, ModalBody, ModalFooter } from '@nextui-org/react'
import { useState } from 'react'

export const SendEvaluationForm = ({ onSuccess, onClose, formRef }) => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <ModalBody>
        <form ref={formRef}>
          <div>
            <Input
              id='linkFile'
              type='file'
              name='linkFile'
              key='inside-linkFile'
              labelPlacement='outside-left'
              label='Archivo'
              accept='application/pdf'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color='danger' variant='light'
          onPress={() => {
            onClose()
          }}
          isDisabled={loading}
        >
          Cancelar
        </Button>
        <Button
          color='primary'
          onPress={async () => {
            setLoading(true)
            await onSuccess()
            setLoading(false)
            onClose()
          }}
          isLoading={loading}
          isDisabled={loading}
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  )
}
