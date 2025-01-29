import { ReactNode, useEffect, useState } from 'react'
import Button from '../Button/Button'

interface Props {
  children: ReactNode
  onClose: () => void
}

const Modal = ({ children, onClose }: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Disable scrolling when the modal is open
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  const handleClose = () => {
    setTimeout(() => onClose(), 300) // Delay to match the animation duration
    setIsVisible(false)
  }

  return (
    <div className="fixed lg:hidden inset-0 flex items-center justify-start sm:justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white p-7 sm:rounded shadow-lg w-[80%] h-full sm:max-h-[90vh] sm:mx-2 overflow-y-auto transform transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
        <Button
          className="absolute -top-1 right-3 text-red !text-4xl w-10 h-10"
          onClick={handleClose}>
          &times;
        </Button>
        {children}
      </div>
    </div>
  )
}

export default Modal
