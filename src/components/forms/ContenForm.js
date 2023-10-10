'use client'
import { useForm } from '@/hooks/useForm'
import { validBetween, validtTextarea } from '@/lib/formValid'
import { ModalBody, Input, Textarea, Button, ModalFooter } from '@nextui-org/react'
import { useMemo, useState } from 'react'

const init = {
  title: '',
  description: '',
  file: { file: null, error: null },
  numOrder: 1
}

export const ContentForm = ({ onSuccess, formRef, onClose, initForm = init, isUpdatable = false, idCourse }) => {
  const { fields, clearAll, clearInput, changeFields } = useForm(initForm)
  const [loading, setLoading] = useState(false)

  const isInvalidOrder = useMemo(() => {
    return validBetween(fields.numOrder, 1, 16)
  }, [fields])

  const isInvalidTextarea = useMemo(() => {
    return validtTextarea(fields.description, 300, 100)
  }, [fields])

  const isFileValid = isUpdatable ? false : (fields.file.file == null)
  const isInvalidAll = [isInvalidOrder, isInvalidTextarea, isFileValid].some(x => x)
  const allIsEmpty = !Object.values(fields).every(x => {
    if (x?.file) return x.file
    return x
  })

  return (
    <>
      <ModalBody>
        <form className='flex flex-col w-[500px] [&>*]:max-w-[500px] gap-6 mb-8' ref={formRef}>
          <div>
            <input
              type='hidden'
              hidden
              name='idCourse'
              value={idCourse}
            />
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
              id='numOrder'
              type='number'
              name='numOrder'
              min={1}
              max={16}
              key='inside-order'
              labelPlacement='inside'
              label='Orden'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              errorMessage={isInvalidOrder && 'Los valores deber estar entre 1 y 16'}
              isInvalid={isInvalidOrder}
              onClear={() => { clearInput('numOrder') }}
              value={fields.numOrder}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='file'
              name='linkFile'
              type='file'
              key='inside-file'
              variant='bordered'
              // accept='application/vnd.ms-powerpoint,
              //          application/vnd.openxmlformats-officedocument.presentationml.slideshow,
              //          application/vnd.openxmlformats-officedocument.presentationml.presentation'
              accept='application/pdf'
              className='w-full'
              size='lg'
              onChange={changeFields}
              errorMessage={fields.file.error || ''}
              isInvalid={fields.file.error != null}
            />
          </div>

          <div>
            <Textarea
              id='description'
              name='description'
              type='textarea'
              key='inside-description'
              labelPlacement='inside'
              label='Descipción'
              variant='bordered'
              minLength={150}
              isClearable
              className='w-full'
              size='lg'
              isInvalid={isInvalidTextarea}
              errorMessage={isInvalidTextarea && 'El campo debe tener al menos 100 caracteres'}
              onClear={() => { clearInput('description') }}
              value={fields.description}
              onChange={changeFields}
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
          isDisabled={loading || allIsEmpty || isInvalidAll || (isUpdatable && fields.file.error != null)}
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  )
}
