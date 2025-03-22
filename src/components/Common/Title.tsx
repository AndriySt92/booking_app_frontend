import cn from 'classnames'

interface Props {
  children: React.ReactNode
  size?: 'lg' | 'md' | 'sm' | 'xs'
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  color?: 'blue' | 'gradient' | 'gray' | 'white'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  className?: string
}

const Title = ({
  children,
  size = 'lg',
  as: Component = 'h2',
  color = 'blue',
  weight = 'bold',
  align = 'left',
  className,
}: Props) => {
  const baseClasses = 'font-bold py-1 tracking-tight leading-tight'
  const sizeClasses = {
    lg: 'text-3xl sm:text-4xl',
    md: 'text-2xl',
    sm: 'text-xl',
    xs: 'text-lg',
  }

  const colorClasses = {
    gradient: 'bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent !w-fit',
    blue: 'text-blue-800',
    gray: 'text-gray-800',
    white: 'text-white',
  }

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[size],
        colorClasses[color],
        weightClasses[weight],
        alignClasses[align],
        className,
      )}>
      {children}
    </Component>
  )
}

export default Title
