'use client'
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'

export const FormModal = ({ children, isOpen, onOpenChange, title }) => {
  return (
    <Modal
      isOpen={isOpen}
      placement='center'
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled={true}
      isDismissable={false}
      hideCloseButton={true}
      size='xl'
      className='grid place-content-center'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
            {children}
          </>
        )}
      </ModalContent>
    </Modal>

  )
}
