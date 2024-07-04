import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  classes: string
  btnType?: 'submit' | 'button'
  disabled?: boolean
  onClick?: () => void
  role?: 'button' | 'link'
  to?: string
}

const Button = ({
  children,
  btnType = 'button',
  classes,
  disabled = false,
  onClick,
  role = 'button',
  to = '',
}: Props) => {
  return (
    <>
      {role === 'button' ? (
        <button
          onClick={onClick}
          type={btnType}
          disabled={disabled}
          className={`${classes} flex items-center rounded-sm py-2 px-4 font-bold text-md`}>
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className={`${classes} flex items-center rounded-sm p-2 font-bold text-md`}>
          {children}
        </Link>
      )}
    </>
  )
}

export default Button
