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
          className={`${classes} flex items-center justify-center rounded-lg py-1 px-3 sm:py-2 sm:px-4 font-semibold sm:text-lg cursor-pointer`}>
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className={`${classes} flex items-center justify-center rounded-lg py-1 px-3 sm:py-2 sm:px-4 font-semibold sm:text-lg cursor-pointer`}>
          {children}
        </Link>
      )}
    </>
  )
}

export default Button
