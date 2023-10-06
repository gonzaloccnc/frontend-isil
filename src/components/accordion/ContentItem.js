import { useMemo } from 'react'
import { DropDown } from '../dropdown/DropDown'
import { PdfModal } from '../modals/PdfModal'
import { useDisclosure } from '@nextui-org/react'
import { WarningModal } from '../modals/WarningModal'

export const ContentItem = ({ description, file, title }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure()
  const contentActions = useMemo(() => {
    return [{
      label: 'Ver documento',
      color: 'primary',
      onClick: onOpen
    }, {
      label: 'Actualizar',
      color: 'success',
      onClick: () => { }
    }, {
      label: 'Eliminar',
      color: 'danger',
      onClick: onOpenDelete
    }]
  }, [])

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
      <WarningModal
        isOpen={isOpenDelete}
        onDelete={() => { }}
        onOpenChange={onOpenChangeDelete}
        title={`¿Estas seguro de eliminar esto "${title}"?`}
      />
    </>
  )
}
