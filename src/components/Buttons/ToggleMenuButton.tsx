import { FaBars, FaTimes } from 'react-icons/fa'
import { Button } from '../'

interface Props {
  isMenuOpen: boolean
  toggleMenu: () => void
}

const ToggleMenuButton = ({ isMenuOpen, toggleMenu }: Props) => (
  <Button 
    onClick={toggleMenu} 
    className="text-white focus:outline-none"
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  >
    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
  </Button>
)

export default ToggleMenuButton