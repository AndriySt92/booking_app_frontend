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
          className={`${classes} flex items-center rounded-lg py-2 px-5 font-semibold text-md sm:text-lg`}>
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className={`${classes} flex items-center rounded-lg p-2 px-5 font-semibold text-md sm:text-lg`}>
          {children}
        </Link>
      )}
    </>
  )
}

export default Button
