import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../hooks'
import { signIn } from '../services/authApi'
import { useLocation, useNavigate } from 'react-router-dom'

const useCreateHotel = () => {
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
      const message = error.message || 'Something went wrong'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useCreateHotel
