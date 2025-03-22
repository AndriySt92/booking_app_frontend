import cn from 'classnames'

interface TextProps {
  children: React.ReactNode
  size?: 'lg' | 'md' | 'base' | 'sm'
  color?: 'gray-600' | 'gray-800'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  as?: keyof JSX.IntrinsicElements
  className?: string
}

const Text: React.FC<TextProps> = ({
  children,
  size = 'sm',
  color = 'gray-800',
  weight = 'normal',
  align = 'left',
  as: Component = 'p',
  className,
}) => {
  const baseClasses = 'text-pretty'
  const sizeClasses = {
    lg: 'text-lg md:text-xl',
    base: 'text-base',
    md: 'text-base md:text-lg',
    sm: 'text-sm',
  }

  const colorClasses = {
    'gray-600': 'text-gray-600',
    'gray-800': 'text-gray-800',
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

export default Text
