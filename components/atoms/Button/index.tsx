import React from 'react'
import styles from './styles.scss'

interface Props {
  text: string
  handleOnClick?: () => void
}

const Button: React.FC<Props> = ({ text, handleOnClick }) => {
  return (
    <button className={styles.button} onClick={handleOnClick}>
      {text}
    </button>
  )
}

export default Button
