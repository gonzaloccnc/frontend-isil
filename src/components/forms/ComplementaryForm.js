import { useForm } from '@/hooks/useForm'
import { Button, ModalBody, ModalFooter, Input } from '@nextui-org/react'
import { useState } from 'react'

const formInt = {
  title: '',
  file: {
    error: null,
    file: null
  }
}

export const ComplementaryForm = ({ formRef, onClose, onSuccess, initForm = formInt, isUpdatable }) => {
  const [loading, setLoading] = useState(false)
  const { fields, clearAll, clearInput, changeFields } = useForm(initForm)
  const fileError = isUpdatable ? false : (fields.file.file == null)

  return (
    <>
      <ModalBody>
        <form className='flex flex-col w-[500px] [&>*]:max-w-[500px] gap-6 mb-8' ref={formRef}>
          <div>
            <Input
              id='title'
              type='text'
              name='title'
              key='inside-title'
              labelPlacement='inside'
              label='Titulo'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('title') }}
              value={fields.title}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='file'
              name='link_file'
              type='file'
              key='inside-file'
              variant='bordered'
              accept='application/pdf'
              className='w-full'
              size='lg'
              onChange={changeFields}
              errorMessage={fields.file.error || ''}
              isInvalid={fields.file.error != null}
            />
          </div>

        </form>
      </ModalBody>
      <ModalFooter>
        <Button color='danger' variant='light'
          onPress={() => {
            clearAll(initForm)
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
            clearAll(initForm)
            onClose()
          }}
          isDisabled={loading || fields.title === '' || fileError}
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  )
}
