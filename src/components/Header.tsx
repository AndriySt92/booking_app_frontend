import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import { Button, SignOutButton } from './'

const Header = () => {
  const { isLoggedIn } = useAppContext()

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Button role="link" to="/my-bookings" classes="text-white hover:bg-blue-600">
                My Bookings
              </Button>
              <Button role="link" to="/my-hotels" classes="text-white hover:bg-blue-600">
                My Hotels
              </Button>
              <SignOutButton />
            </>
          ) : (
            <Button role="link" to="/sign-in" classes="text-blue-600 bg-white hover:bg-gray-100">
              Sign In
            </Button>
          )}
        </span>
      </div>
    </div>
  )
}

export default Header
