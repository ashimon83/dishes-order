import React from 'react'
import classnames from 'classnames'
import styles from './styles.scss'

interface Props {
  text: string
  handleOnClick?: () => void
  className?: string
}

const Button: React.FC<Props> = ({ text, handleOnClick, className }) => {
  return (
    <button
      className={classnames(styles.button, className)}
      onClick={handleOnClick}
    >
      {text}
    </button>
  )
}

export default Button
