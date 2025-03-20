import { useCallback, useState } from 'react'

const useModalManager = () => {
  const [currentModal, setCurrentModal] = useState<null | string>(null)
  const [entityId, setEntityId] = useState<null | string>(null)

  const openModal = useCallback((modalName: string, entityId?: string) => {
    setCurrentModal(modalName)
    if (entityId) {
      setEntityId(entityId)
    }
  }, [])

  const closeModal = useCallback(() => {
    setCurrentModal(null)
    setEntityId(null)
  }, [])

  return { closeModal, currentModal, openModal, entityId }
}

export default useModalManager
