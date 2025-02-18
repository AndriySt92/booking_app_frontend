import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  onClick?: () => void
}

type LinkProps = {
  role: 'link'
  to: string // Required when role is "link"
}

type ButtonOnlyProps = {
  role?: 'button' // Default to "button"
  to?: never // Prevent `to` when role is "button"
}

type Props = ButtonProps & (LinkProps | ButtonOnlyProps)

const Button = React.memo(
  ({
    children,
    type = 'button',
    className,
    disabled = false,
    onClick,
    role = 'button',
    to = '',
  }: Props) => {
    const classNames = cn(
      'flex items-center justify-center rounded-lg py-2 px-4 font-semibold sm:text-lg cursor-pointer',
      className,
    )

    return (
      <>
        {role === 'button' ? (
          <button onClick={onClick} type={type} disabled={disabled} className={classNames}>
            {children}
          </button>
        ) : (
          <Link to={to} className={classNames}>
            {children}
          </Link>
        )}
      </>
    )
  },
)

export default Button
