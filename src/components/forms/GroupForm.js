'use client'

import { useForm } from '@/hooks/useForm'
import { Avatar, Button, Chip, Input, ModalBody, ModalFooter, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

const initForm = {
  title: ''
}

const GroupForm = ({ members, onSuccess, onClose, formRef, init = initForm }) => {
  const { fields, changeFields, clearInput, clearAll } = useForm(init)
  const [students] = useState(members)
  const [values, setValues] = useState(new Set([]))
  const [loading, setLoading] = useState(false)

  return (
    <>
      <ModalBody>
        <form className='flex flex-col w-[500px] [&>*]:max-w-[500px] gap-10 mb-8' ref={formRef}>
          <div>
            <Input
              id='title'
              type='text'
              name='title'
              key='inside-title'
              labelPlacement='inside'
              label='Nombre del grupo'
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
            <Select
              id='students'
              name='students'
              variant='bordered'
              labelPlacement='outside'
              label='Integrantes'
              size='lg'
              selectedKeys={values}
              selectionMode='multiple'
              onSelectionChange={setValues}
            >
              {
                students.map(x => (
                  <SelectItem key={x.idStudent} value={x.idStudent}
                    textValue={x.names}>
                    <div className='flex gap-2 items-center'>
                      <Avatar alt={x.names}
                        className='flex-shrink-0'
                        size='sm'
                        src={x.avatar}
                      />
                      <div className='flex flex-col'>
                        <span className='text-small'>{x.names}</span>
                        <span className='text-tiny text-default-400'>{x.email}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))
              }
            </Select>
          </div>
        </form>
        <div className='flex gap-1 items-center flex-wrap'>
          {
            Array.from(values).map(x => {
              const student = students.find(s => s.idStudent === x)
              return <Chip key={x}>{student.names}</Chip>
            })
          }
        </div>
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
          isLoading={loading}
          isDisabled={loading || fields.title === '' || values.size === 0}
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  )
}

export default GroupForm
