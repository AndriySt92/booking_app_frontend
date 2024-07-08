import { Link } from 'react-router-dom'
import { useAppContext } from '../../contexts/AppContext'
import { Button, SignOutButton } from '../'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const { isLoggedIn } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="bg-blue-800 py-6">
    <div className="container mx-auto flex justify-between items-center">
      <span className="text-3xl text-white font-bold tracking-tight">
        <Link to="/">Booking.com</Link>
      </span>
      <div className={`${isLoggedIn ? 'hidden' : 'flex'} md:flex justify-center items-center space-x-2`}>
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
      </div>
      <div className={`${isLoggedIn ? 'md:hidden' : 'hidden'} flex items-center`}>
        <Button onClick={toggleMenu} classes="text-white focus:outline-none">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </Button>
      </div>
    </div>
    <div className={`${isLoggedIn ? 'md:hidden' : 'hidden'} overflow-hidden transition-max-height duration-100 ease-in-out`}>
      <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
        <div className="flex flex-col items-center justify-center space-y-2 py-2">
          {isLoggedIn && (
            <>
              <Button
                role="link"
                to="/my-bookings"
                classes="text-white hover:bg-blue-600 text-center">
                My Bookings
              </Button>
              <Button
                role="link"
                to="/my-hotels"
                classes="text-white hover:bg-blue-600 text-center">
                My Hotels
              </Button>
              <SignOutButton />
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Header
