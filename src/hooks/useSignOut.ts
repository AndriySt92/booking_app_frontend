import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../hooks'
import { signOut } from '../services/authApi'

const useSignOut = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  return useMutation(signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken')

      showToast({ message: 'Signed Out!', type: 'SUCCESS' })
    },
    onError: (error: Error) => {
      const message = error.message || 'Something went wrong'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useSignOut
