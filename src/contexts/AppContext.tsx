import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { validateToken } from '../services/authApi'
import { Toast } from '../components'
import { loadStripe, Stripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

interface IToastMessage {
  message: string
  type: 'SUCCESS' | 'ERROR'
}

interface IAppContext {
  showToast: (toastMessage: IToastMessage) => void
  isLoggedIn: boolean
  stripePromise: Promise<Stripe | null>;
}

const AppContext = React.createContext<IAppContext | undefined>(undefined)

const stripePromise = loadStripe(STRIPE_PUB_KEY);

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
        stripePromise,
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
