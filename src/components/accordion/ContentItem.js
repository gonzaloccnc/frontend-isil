import { useMemo, useRef } from 'react'
import { DropDown } from '../dropdown/DropDown'
import { PdfModal } from '../modals/PdfModal'
import { useDisclosure } from '@nextui-org/react'
import { FormModal } from '../modals/FormModal'
import { ContentForm } from '../forms/ContenForm'
import { useSession } from 'next-auth/react'
import { axiosClientSameServer } from '@/lib/axios'
import { useAdminContext } from '@/hooks/useAdminContext'

export const ContentItem = ({ id, idCourse, description, file, title, numOrder }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate, onOpenChange: onOpenChangeUpdate } = useDisclosure()
  const { data } = useSession()
  const { setStoreContents, contents } = useAdminContext()
  const bearer = data.user.accessToken
  const formRef = useRef(null)

  const contentActions = useMemo(() => {
    return [{
      label: 'Ver documento',
      color: 'primary',
      onClick: onOpen
    }, {
      label: 'Actualizar',
      color: 'success',
      onClick: onOpenUpdate
    }
      // {
      //   label: 'Eliminar',
      //   color: 'danger',
      //   onClick: onOpenDelete
      // }
    ]
  }, [])

  const onSucces = async () => {
    const form = new FormData(formRef.current)
    form.set('token', bearer)
    form.set('url', file)

    try {
      const { data } = await axiosClientSameServer.patch(`/content/${id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const lessThis = contents.data.filter(x => x.id_content !== id)
      console.log(data)
      setStoreContents([...lessThis, data.data].sort((a, b) => a.id_content - b.id_content))
    } catch (er) {
      console.log(er)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <p>{description}</p>
        <DropDown items={contentActions} />
      </div>
      <PdfModal
        file={file}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <FormModal
        isOpen={isOpenUpdate}
        onOpenChange={onOpenChangeUpdate}
        title={`Actualizar "${title}"`}
      >
        <ContentForm
          idCourse={idCourse}
          formRef={formRef}
          onClose={onCloseUpdate}
          onSuccess={onSucces}
          initForm={{ description, title, file: { file: null, error: null }, numOrder }}
          isUpdatable
        />
      </FormModal>
    </>
  )
}
