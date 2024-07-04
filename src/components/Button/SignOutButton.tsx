import { useMutation, useQueryClient } from 'react-query'
import { signOut } from '../../services/authApi'
import { useAppContext } from '../../contexts/AppContext'
import Button from './Button'

const SignOutButton = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  const mutation = useMutation(signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken')
      showToast({ message: 'Signed Out!', type: 'SUCCESS' })
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <Button onClick={handleClick} classes="text-blue-600 bg-white hover:bg-gray-100 ">
      Sign Out
    </Button>
  )
}

export default SignOutButton
