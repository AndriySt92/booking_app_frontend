import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { validateToken } from '../services/authApi'
import { Toast } from '../components'

interface IToastMessage {
  message: string
  type: 'SUCCESS' | 'ERROR'
}

interface IAppContext {
  showToast: (toastMessage: IToastMessage) => void
  isLoggedIn: boolean
}

const AppContext = React.createContext<IAppContext | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<IToastMessage | null>(null)

  const { isError } = useQuery('validateToken', validateToken, {
    retry: false,
  })

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage)
        },
        isLoggedIn: !isError,
      }}>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context as IAppContext
}
