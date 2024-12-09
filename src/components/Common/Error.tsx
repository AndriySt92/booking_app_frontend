interface Props {
  message: string
  size?: 'small' | 'large'
}

const Error = ({ message, size }: Props) => {
  const baseClasses = 'text-red-600 font-semibold'
  const sizeClasses = size === 'small' ? 'text-sm' : 'text-2xl'

  return <div className={`${baseClasses} ${sizeClasses}`}>{message}</div>
}

export default Error
