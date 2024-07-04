import { ReactNode, useEffect } from 'react'
import Button from '../Button/Button'

interface Props {
  children: ReactNode
  onClose: () => void
}

const Modal = ({ children, onClose }: Props) => {
  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.classList.add('overflow-hidden')

    // Enable scrolling when the modal is closed
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div className="fixed lg:hidden inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-5 rounded shadow-lg max-w-md mx-2 w-full max-h-[90vh] overflow-y-auto">
        <Button
          classes="absolute -top-2 -right-3 text-white hover:text-gray-700 text-4xl"
          onClick={onClose}>
          &times;
        </Button>
        {children}
        <div className="flex justify-end mt-4">
          <Button classes="bg-blue-600 text-white hover:bg-blue-500" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
