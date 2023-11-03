'use client'
import CardGroup from '@/components/cards/CardGroup'
import GroupForm from '@/components/forms/GroupForm'
import { FormModal } from '@/components/modals/FormModal'
import { axiosClient } from '@/lib/axios'
import { Button, useDisclosure } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const GroupsWrap = ({ members }) => {
  const { id } = useParams()
  const { data } = useSession()
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()
  const [groups, setGroups] = useState([])
  const formRef = useRef(null)
  const role = data?.user?.role
  const token = data?.user?.accessToken
  const idStudent = data?.user?.id

  const membersWithoutGroup = members.map(x => {
    const member = groups.find(m => m.idStudent === x.idStudent)

    if (member) return null
    return x
  }).filter(x => x)

  const groupDictionary = {}

  groups.forEach(x => {
    const groupId = x.idGroup

    if (!groupDictionary[groupId]) {
      groupDictionary[groupId] = {
        idGroup: groupId,
        groupName: x.groupName,
        members: []
      }
    }

    groupDictionary[groupId].members.push(x)
  })

  const existMyGroup = groups.find(x => x.idStudent === idStudent)
  const membersStudents = Object.values(groupDictionary)
  const myGroup = membersStudents.filter(x => x.idGroup === existMyGroup?.idGroup)
  const groupsRender = role === 'PROFESOR' ? membersStudents : myGroup
  const onSuccess = async () => {
    const formData = new FormData(formRef.current)
    const body = {
      title: '',
      students: []
    }

    formData.forEach((x, y) => {
      if (y === 'title') {
        body[y] = x
        return
      }
      const student = {
        idClassroom: id,
        idStudent: x
      }
      body.students.push(student)
    })

    try {
      console.log(body)
      const { data } = await axiosClient.post('/', body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data)
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    axiosClient.get(`/user/classroom/${id}/groups`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(({ data }) => {
      setGroups(data)
    }).catch(() => { })
  }, [])

  return (
    <>
      <section>
        <div className='flex justify-end mb-4'>
          {
            role === 'PROFESOR' &&
            <Button color='primary' onPress={onOpen}>
              Crear grupo de clase
            </Button>
          }
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {
            !membersStudents.length
              ? <p>No hay grupos asignados aún!</p>
              : groupsRender.map(x => {
                return (
                  <CardGroup
                    key={x.idGroup}
                    students={x.members}
                    groupName={x.groupName}
                  />
                )
              })
          }
        </div>
      </section>
      <FormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title='Crear grupo de clase'
      >
        <GroupForm
          formRef={formRef}
          onClose={onClose}
          members={membersWithoutGroup}
          onSuccess={onSuccess}
        />
      </FormModal>
    </>
  )
}

export default GroupsWrap
