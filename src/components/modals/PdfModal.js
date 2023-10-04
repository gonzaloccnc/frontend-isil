'use client'
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from '@nextui-org/react'

export const PdfModal = ({ file, isOpen, onOpenChange }) => {
  const downloadable = file.split('/upload').join('/upload/fl_attachment')

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
        placement='center'
        hideCloseButton={true}
        size='5xl'
      >
        <ModalContent className='h-[90vh] max-h-none'>
          {(onClose) => (
            <>
              <ModalBody>
                <iframe
                  src={file + '#zoom=70'}
                  className='w-full h-full'
                ></iframe>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light'
                  onPress={onClose}>
                  Close
                </Button>
                <a download href={downloadable}>
                  <Button color='primary'>
                    Descargar
                  </Button>
                </a>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
