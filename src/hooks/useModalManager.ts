import { useState } from 'react'

const useModalManager = () => {
  const [currentModal, setCurrentModal] = useState<null | string>(null)

  const openModal = (modalName: string) => {
    setCurrentModal(() => modalName)
  }

  const closeModal = () => {
    setCurrentModal(null)
  }

  return { closeModal, currentModal, openModal }
}

export default useModalManager
