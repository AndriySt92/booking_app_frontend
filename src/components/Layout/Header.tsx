import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../../hooks'
import { Button, SignOutButton } from '../'
import NavButton from '../Buttons/NavButton'
import ToggleMenuButton from '../Buttons/ToggleMenuButton'

interface Props {
  scrollToContent: React.RefObject<HTMLDivElement>
}

const NAV_ITEMS = [
  { path: '/my-bookings', label: 'My Bookings' },
  { path: '/my-hotels', label: 'My Hotels' },
  { path: '/favorites', label: 'Favorites' },
]

const Header = ({ scrollToContent }: Props) => {
  const { isLoggedIn } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  // Memoize scrollable paths
  const scrollPaths = useMemo(() => NAV_ITEMS.map((item) => item.path), [])

  // Scroll when route changes and close menu
  useEffect(() => {
    let timer: any
    if (scrollPaths.includes(currentPath)) {
      const scrollBehavior = () => {
        if (scrollToContent.current) {
          scrollToContent.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }

      timer = setTimeout(scrollBehavior, 150)
    }
    setIsMenuOpen(false)
    window.scrollTo({ top: 0 })

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [currentPath, scrollToContent, scrollPaths])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  return (
    <div className="bg-blue-800 py-6 border-b-2 border-white md:border-b-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl text-white font-bold mb-2">
          <Link to="/">Booking.com</Link>
        </div>

        {/* Desktop Navigation */}
        <div
          className={`${
            isLoggedIn ? 'hidden' : 'flex'
          } md:flex justify-center items-center space-x-1 lg:space-x-2`}>
          {isLoggedIn ? (
            <>
              {NAV_ITEMS.map((item) => (
                <NavButton key={item.path} {...item} currentPath={currentPath} />
              ))}
              <SignOutButton />
            </>
          ) : (
            <Button role="link" to="/sign-in" className="text-blue-600 bg-white hover:bg-gray-100">
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className={`${isLoggedIn ? 'md:hidden' : 'hidden'} flex items-center`}>
          <ToggleMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isLoggedIn ? 'md:hidden' : 'hidden'
        } overflow-hidden transition-max-height duration-100 ease-in-out`}>
        <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            {isLoggedIn && (
              <>
                {NAV_ITEMS.map((item) => (
                  <NavButton key={item.path} {...item} currentPath={currentPath} />
                ))}
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
