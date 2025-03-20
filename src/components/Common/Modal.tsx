import { ReactNode, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import { IoCloseOutline } from 'react-icons/io5'
import { Button } from '../'

interface Props {
  children: ReactNode
  onClose: () => void
  variant: 'delete' | 'filter'
}

const Modal = ({ children, onClose, variant }: Props) => {
  const modalRoot = useMemo(() => document.getElementById('modal-root')!, [])
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

  const modalConfig = {
    filter: {
      container: 'items-center justify-start sm:justify-center lg:hidden',
      content: `w-[80%] h-full sm:max-h-[90vh] overflow-y-auto ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`,
      closeButton: 'top-1 right-2',
    },
    delete: {
      container: 'justify-center items-center',
      content: `w-full max-w-md mx-4 rounded-lg ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-40 opacity-0'
      }`,
      closeButton: 'hidden',
    },
  }

  const currentConfig = modalConfig[variant]

  return ReactDOM.createPortal(
    <div className={cn('fixed inset-0 flex bg-black bg-opacity-50 z-50', currentConfig.container)}>
      <div
        className={cn(
          'bg-white p-4 sm:p-6 sm:rounded-lg shadow-lg sm:mx-2 transform transition-all duration-300',
          currentConfig.content,
        )}>
        <Button onClick={handleClose}>
          <IoCloseOutline className={cn('absolute', currentConfig.closeButton)} size={28} />
        </Button>

        {children}
      </div>
    </div>,
    modalRoot,
  )
}

export default Modal
