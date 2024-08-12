import { useSignOut } from '../../hooks'
import Button from './Button'

const SignOutButton = () => {
  const { mutate } = useSignOut()

  const handleClick = () => {
    mutate()
  }

  return (
    <Button onClick={handleClick} classes="text-blue-600 bg-white hover:bg-gray-100 ">
      Sign Out
    </Button>
  )
}

export default SignOutButton
