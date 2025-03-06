import cn from 'classnames'
import { Button } from '..'

interface Props {
  path: string
  label: string
  currentPath: string
  className?: string
}

const NavButton = ({ path, label, currentPath, className }: Props) => (
  <Button
    role="link"
    to={path}
    className={cn(
      'text-white hover:bg-blue-600 transition-colors',
      {
        'bg-blue-700': currentPath === path,
      },
      className,
    )}>
    {label}
  </Button>
)

export default NavButton
