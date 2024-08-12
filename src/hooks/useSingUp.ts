import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import { signUp } from '../services/authApi'

const useSignUp = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()
  const navigate = useNavigate()

  return useMutation(signUp, {
    onSuccess: async () => {
      showToast({ message: 'Registration Success!', type: 'SUCCESS' })

      await queryClient.invalidateQueries('validateToken')

      navigate('/')
    },
    onError: (error: Error) => {
      const message = error.message || 'Something went wrong'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useSignUp
