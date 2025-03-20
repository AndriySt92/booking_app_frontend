import { ReactNode } from 'react'
import { Button, Modal, Text, Title } from '../'

interface Props {
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
  entityName?: string
  children?: ReactNode
}

const DeleteModal = ({ onClose, onConfirm, isDeleting, entityName }: Props) => {
  return (
    <Modal variant="delete" onClose={onClose}>
      <div className="space-y-7 p-0 sm:p-6">
        <div className="pb-5 border-b">
          <Title size="lg" className="mb-4" align="center" color="gray">
            Confirm Delete
          </Title>
          <Text size="md" align="center">
            {entityName ? (
              <>
                Are you sure you want to delete{' '}
                <strong className="text-gray-900">"{entityName}"</strong>?
              </>
            ) : (
              'Are you sure you want to delete this item?'
            )}{' '}
            This action cannot be undone.
          </Text>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <Button onClick={onClose} className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300">
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            className="w-full bg-red-600 text-white hover:bg-red-500"
            disabled={isDeleting}>
            Confirm Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
