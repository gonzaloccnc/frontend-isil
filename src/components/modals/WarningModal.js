import { Modal, ModalContent, ModalHeader, ModalBody, Button, ModalFooter } from '@nextui-org/react'
import { useState } from 'react'

export const WarningModal = ({ isOpen, onOpenChange, onDelete, title }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState({ ok: false, success: '' })

  const beforeCLose = async (onCLose) => {
    try {
      setLoading(true)
      await onDelete()
      setSuccess({ ok: true, success: 'Hecho con exito' })
      setTimeout(() => {
        onCLose()
        setSuccess({ ok: false, success: '' })
      }, 2000)
    } catch (ex) {
      setError('Error al eliminar')
      setTimeout(() => {
        setError(null)
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      placement='center'
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled={true}
      isDismissable={false}
      hideCloseButton={true}
      className='text-center'
    >
      <ModalContent className='dark:bg-dark-secondary'>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
            <ModalBody>
              <div className='flex items-center justify-center gap-4 w-full'>
                <Button color='success' variant='light'
                  onPress={onClose}
                  isDisabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  color='danger'
                  onPress={() => { beforeCLose(onClose) }}
                  isDisabled={loading || success.ok}
                >
                  Eliminar
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className='flex flex-col justify-center'>
              <p className='text-success-500'>{success.success}</p>
              <p className='text-danger-500'>{error}</p>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>

  )
}
