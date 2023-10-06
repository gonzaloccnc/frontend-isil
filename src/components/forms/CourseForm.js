import { useForm } from '@/hooks/useForm'
import { validCredits, validtTextarea } from '@/lib/formValid'
import { Button, Input, ModalBody, ModalFooter, Textarea } from '@nextui-org/react'
import { useMemo } from 'react'

const init = {
  title: '',
  credits: 2,
  fileSyllabus: {
    file: null,
    error: null
  },
  description: ''
}

export const CourseForm = ({ onClose, onSuccess, formRef, isUpdatable = false, initForm = init }) => {
  const { fields, changeFields, clearInput, clearAll } = useForm(initForm)
  const isInvalidCredits = useMemo(() => {
    return validCredits(fields.credits)
  }, [fields])

  const isInvalidTextarea = useMemo(() => {
    return validtTextarea(fields.description, 300, 150)
  }, [fields])

  const isFileValid = isUpdatable ? false : (fields.fileSyllabus.file == null)
  const isInvalidAll = [isInvalidCredits, isInvalidTextarea, isFileValid].some(x => x)
  const allIsEmpty = !Object.values(fields).every(x => {
    if (x?.fileSyllabus) return x.fileSyllabus.file
    return x
  })

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
              onClear={() => { clearInput('title') }}
              className='w-full'
              size='lg'
              value={fields.title}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='credits'
              type='number'
              name='credits'
              min={2}
              max={4}
              key='inside-credits'
              labelPlacement='inside'
              label='Creditos'
              variant='bordered'
              errorMessage={isInvalidCredits && 'Los valores deber estar entre 2 y 4'}
              isInvalid={isInvalidCredits}
              isClearable
              onClear={() => { clearInput('credits') }}
              className='w-full'
              size='lg'
              value={fields.credits}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='fileSyllabus'
              name='syllabus'
              type='file'
              key='inside-syllabus'
              variant='bordered'
              errorMessage={fields.fileSyllabus.error || ''}
              isInvalid={fields.fileSyllabus.error != null}
              accept='application/pdf'
              className='w-full'
              size='lg'
              onChange={changeFields}
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
              errorMessage={isInvalidTextarea && 'El campo debe tener al menos 150 caracteres'}
              isInvalid={isInvalidTextarea}
              isClearable
              onClear={() => { clearInput('description') }}
              className='w-full'
              size='lg'
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
          }}>
          Cancelar
        </Button>
        <Button
          color='primary'
          onPress={() => {
            onSuccess()
            clearAll(initForm)
            onClose()
          }}
          isDisabled={allIsEmpty || isInvalidAll || (isUpdatable && fields.fileSyllabus.error != null)}
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  )
}
