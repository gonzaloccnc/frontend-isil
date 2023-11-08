'use client'

import { useForm } from '@/hooks/useForm'
import { Button, Input, ModalBody, ModalFooter, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

const initial = {
  linkFile: '',
  startDate: '',
  endDate: '',
  type: 'EP1',
  isVisible: '0',
  itsGroup: '0'
}

const typesEvaluations = [{
  type: 'EP1',
  label: 'Evaluación Permanente 1'
}, {
  type: 'EP2',
  label: 'Evaluación Permanente 2'
}, {
  type: 'EP3',
  label: 'Evaluación Permanente 3'
}, {
  type: 'EP4',
  label: 'Evaluación Permanente 4'
}, {
  type: 'PARCIAL',
  label: 'Evaluación Parcial'
}, {
  type: 'FINAL',
  label: 'Evaluación Final'
}]

const visibilities = [{
  visibility: '0',
  label: 'No mostrar a los estudiantes'
}, {
  visibility: '1',
  label: 'Mostrar a los estudiantes'
}]

const deliverys = [{
  delivery: '0',
  label: 'Individual'
}, {
  delivery: '1',
  label: 'Grupal'
}]

export const EvaluationForm = ({ isUpdated = false, evals, onSuccess, onClose, formRef, initForm = initial }) => {
  const restEvaluations = evals
    ? typesEvaluations.filter(typeEval => !evals.some(evalDB => evalDB.type === typeEval.type))
    : typesEvaluations

  const { clearInput, fields, clearAll, changeFields, changeSelect } = useForm({ ...initForm, type: isUpdated ? initForm.type : restEvaluations[0].type })
  const [loading, setLoading] = useState(false)

  return (
    <>
      <ModalBody>
        <form className='grid grid-cols-2 gap-10 mb-8' ref={formRef}>
          <div>
            <Input
              id='startDate'
              type='datetime-local'
              name='startDate'
              key='inside-startDate'
              labelPlacement='outside-left'
              label='Fecha de inicio'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('startDate') }}
              value={fields.startDate}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='endDate'
              type='datetime-local'
              name='endDate'
              key='inside-endDate'
              labelPlacement='outside-left'
              label='Fecha de vencimiento'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('endDate') }}
              value={fields.endDate}
              onChange={changeFields}
            />
          </div>

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
              onClear={() => { clearInput('linkFile') }}
              value={fields.linkFile}
              onChange={changeFields}
            />
          </div>

          <div>
            <Select
              id='type'
              name='type'
              variant='bordered'
              labelPlacement='outside'
              label='Tipo de evaluación'
              size='lg'
              selectedKeys={[fields.type]}
              onChange={changeSelect}
              isDisabled={isUpdated}
            >
              {
                restEvaluations.map(x => (
                  <SelectItem
                    key={x.type}
                    value={x.type}
                  >
                    {x.label}
                  </SelectItem>
                ))
              }
            </Select>
          </div>

          <div>
            <Select
              id='isVisible'
              name='isVisible'
              variant='bordered'
              labelPlacement='outside'
              label='Visibilidad'
              size='lg'
              selectedKeys={[fields.isVisible]}
              onChange={changeSelect}
            >
              {
                visibilities.map(x => (
                  <SelectItem
                    key={x.visibility}
                    value={x.visibility}
                  >
                    {x.label}
                  </SelectItem>
                ))
              }
            </Select>
          </div>

          <div>
            <Select
              id='itsGroup'
              name='itsGroup'
              variant='bordered'
              labelPlacement='outside'
              label='Tipo de entrega'
              size='lg'
              selectedKeys={[fields.itsGroup]}
              onChange={changeSelect}
            >
              {
                deliverys.map(x => (
                  <SelectItem
                    key={x.delivery}
                    value={x.delivery}
                  >
                    {x.label}
                  </SelectItem>
                ))
              }
            </Select>
          </div>

        </form>

      </ModalBody>
      <ModalFooter>
        <Button color='danger' variant='light'
          onPress={() => {
            clearAll({ ...initForm, type: isUpdated ? initForm.type : restEvaluations[0].type })
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
            clearAll({ ...initForm, type: isUpdated ? initForm.type : restEvaluations[0].type })
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
