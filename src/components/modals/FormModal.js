'use client'
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'

export const FormModal = ({ children, isOpen, onOpenChange, title, scroll = 'normal', className = 'grid place-content-center', size = 'xl' }) => {
  return (
    <Modal
      isOpen={isOpen}
      placement='center'
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled={true}
      isDismissable={false}
      hideCloseButton={true}
      size={size}
      className={className}
      scrollBehavior={scroll}
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
