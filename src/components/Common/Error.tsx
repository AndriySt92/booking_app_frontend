interface Props {
  message: string
  size?: 'small' | 'large'
  center?: boolean
}

const Error = ({ message, size = 'large', center }: Props) => {
  const baseClasses = 'text-red-600 font-semibold'
  const sizeClasses = size === 'small' ? 'text-sm' : 'text-2xl'
  const textAlignClass = center ? 'text-center' : ''

  return <div className={`${baseClasses} ${sizeClasses} ${textAlignClass}`}>{message}</div>
}

export default Error
