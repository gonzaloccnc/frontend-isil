'use client'
import { useForm } from '@/hooks/useForm'
import { validBetween, validUrl } from '@/lib/formValid'
import { ModalBody, Input, Button, ModalFooter, Select, SelectItem } from '@nextui-org/react'
import { useMemo, useState } from 'react'

const init = {
  nrc: '',
  schoolDay: 'Lunes',
  startTime: '07:00',
  endTime: '08:50',
  linkMeet: '',
  campus: 'SAN ISIDRO',
  period: '202320',
  startDate: '2023-04-05',
  endDate: '2023-12-20',
  idTeacher: '',
  idCourse: '',
  totalHours: '2',
  modality: '1',
  maxMembers: 35
}
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const campus = [{
  value: 'SAN ISIDRO',
  text: 'San Isidro'
},
{
  value: 'LA MOLINA',
  text: 'La Molina'
},
{
  value: 'MIRAFLORES',
  text: 'Miraflores'
},
{
  value: 'REMOTO',
  text: 'Remoto'
}]
const periods = ['202320', '202410', '202420', '202510', '202520']
const hours = ['2', '3', '4']
const modalities = [{
  text: 'Virtual',
  value: 1
}, {
  text: 'Remoto',
  value: 2
}, {
  text: 'Semiremoto',
  value: 3
}, {
  text: 'Presencial',
  value: 4
}]

export const ClassForm = ({ onSuccess, formRef, onClose, initForm = init, isUpdatable = false, idClass }) => {
  const { fields, clearAll, clearInput, changeFields, changeSelect } = useForm(initForm)
  const [loading, setLoading] = useState(false)

  const isValidNrc = useMemo(() => {
    return validBetween(fields.nrc, 1000, 10000)
  }, [fields])

  const isValidURL = useMemo(() => {
    return validUrl(fields.linkMeet)
  }, [fields])

  const isValidMembers = useMemo(() => {
    return validBetween(fields.maxMembers, 10, 50)
  }, [fields])

  const isInvalidAll = [isValidNrc, isValidNrc, isValidMembers].some(x => x)
  const allIsEmpty = !Object.values(fields).every(x => {
    return x
  })

  return (
    <>
      <ModalBody>
        <form className='grid grid-cols-2 min-w-[500px] gap-6 mb-8' ref={formRef}>
          <div>
            <input
              type='hidden'
              hidden
              name='idClassroom'
              value={idClass}
            />
            <Input
              id='nrc'
              type='number'
              name='nrc'
              key='inside-nrc'
              labelPlacement='inside'
              label='NRC'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('nrc') }}
              errorMessage={isValidNrc && 'El NRC debe ser de 4 digitos'}
              isInvalid={isValidNrc}
              value={fields.nrc}
              onChange={changeFields}
            />
          </div>

          <div>
            <Select
              id='schoolDay'
              name='schoolDay'
              variant='bordered'
              label='Día'
              size='lg'
              selectedKeys={[fields.schoolDay]}
              onChange={changeSelect}
            >
              {
                days.map(x => (
                  <SelectItem key={x} value={x}>
                    {x}
                  </SelectItem>
                ))
              }
            </Select>
          </div>

          <div>
            <Input
              id='startTime'
              name='startTime'
              type='time'
              key='inside-startTime'
              labelPlacement='inside'
              label='Hora de inicio'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('startTime') }}
              errorMessage={fields.startTime === '' && 'Escoga una hora'}
              isInvalid={fields.startTime === ''}
              value={fields.startTime}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='endTime'
              name='endTime'
              type='time'
              key='inside-endTime'
              labelPlacement='inside'
              label='Hora final'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('endTime') }}
              errorMessage={fields.endTime === '' && 'Escoga una hora'}
              isInvalid={fields.endTime === ''}
              value={fields.endTime}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='linkMeet'
              type='url'
              name='linkMeet'
              key='inside-linkMeet'
              labelPlacement='inside'
              label='Link de la reunión'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('linkMeet') }}
              errorMessage={isValidURL && 'Ingrese una URL valida'}
              isInvalid={isValidURL}
              value={fields.linkMeet}
              onChange={changeFields}
            />
          </div>

          <div>
            <Select
              id='campus'
              name='campus'
              variant='bordered'
              label='Campus'
              size='lg'
              selectedKeys={[fields.campus]}
              onChange={changeSelect}
            >
              {
                campus.map(x => (
                  <SelectItem key={x.value} value={x.value}>
                    {x.text}
                  </SelectItem>
                ))
              }
            </Select>
          </div>

          <div>
            <Select
              id='period'
              name='period'
              variant='bordered'
              label='Periodo'
              size='lg'
              selectedKeys={[fields.period]}
              onChange={changeSelect}
            >
              {
                periods.map(x => (
                  <SelectItem key={x} value={x}>
                    {x}
                  </SelectItem>
                ))
              }
            </Select>
          </div>

          <div>
            <Input
              id='startDate'
              name='startDate'
              type='date'
              key='inside-startDate'
              labelPlacement='inside'
              label='Fecha de inicio'
              min='2023-01-01'
              max='2050-01-01'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('startDate') }}
              errorMessage={fields.startDate === '' && 'Escoga una fecha'}
              isInvalid={fields.startDate === ''}
              value={fields.startDate}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='endDate'
              name='endDate'
              type='date'
              key='inside-endDate'
              labelPlacement='inside'
              label='Fecha final'
              min={new Date(Date.now()).getFullYear() + '-01-01'}
              max={(new Date(Date.now()).getFullYear() + 10) + '-01-01'}
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('endDate') }}
              errorMessage={fields.endDate === '' && 'Escoga una fecha'}
              isInvalid={fields.endDate === ''}
              value={fields.endDate}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='idTeacher'
              type='text'
              name='idTeacher'
              key='inside-idTeacher'
              labelPlacement='inside'
              label='Profesor'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('idTeacher') }}
              value={fields.idTeacher}
              onChange={changeFields}
            />
          </div>

          <div>
            <Input
              id='idCourse'
              type='text'
              name='idCourse'
              key='inside-idCourse'
              labelPlacement='inside'
              label='Curso'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('idCourse') }}
              value={fields.idCourse}
              onChange={changeFields}
            />
          </div>

          <div>
            <Select
              id='totalHours'
              name='totalHours'
              variant='bordered'
              label='Horas'
              size='lg'
              selectedKeys={[fields.totalHours]}
              onChange={changeSelect}
            >
              {
                hours.map(x => (
                  <SelectItem key={x} value={x}>
                    {x}
                  </SelectItem>
                ))
              }
            </Select>
          </div>

          <div>
            <Select
              id='modality'
              name='modality'
              variant='bordered'
              label='Modalidad'
              size='lg'
              selectedKeys={[fields.modality]}
              onChange={changeSelect}
            >
              {
                modalities.map(x => (
                  <SelectItem
                    key={x.value}
                    value={x.value}
                  >
                    {x.text}
                  </SelectItem>
                ))
              }
            </Select>
          </div>

          <div>
            <Input
              id='maxMembers'
              type='number'
              name='maxMembers'
              min={10}
              max={50}
              key='inside-maxMembers'
              labelPlacement='inside'
              label='Miembros (max)'
              variant='bordered'
              isClearable
              className='w-full'
              size='lg'
              onClear={() => { clearInput('maxMembers') }}
              errorMessage={isValidMembers && 'El campo debe tener mas de 9 y menos de 51 integrantes'}
              isInvalid={isValidMembers}
              value={fields.maxMembers}
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
          isDisabled={loading || allIsEmpty || isInvalidAll}
        >
          Guardar
        </Button>
      </ModalFooter>
    </>
  )
}
