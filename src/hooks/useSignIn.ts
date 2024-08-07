import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import { signIn } from '../services/authApi'

const useSignIn = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()
  
  const navigate = useNavigate()
  const location = useLocation()

  return useMutation(signIn, {
    onSuccess: async () => {
      showToast({ message: 'Sign in Successful!', type: 'SUCCESS' })
      await queryClient.invalidateQueries('validateToken')
      navigate(location.state?.from?.pathname || '/')
    },
    onError: (error: Error) => {
      let message = error.message || 'Something went wrong'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useSignIn
