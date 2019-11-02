import React, { ReactChildren, ReactNode } from 'react'
import styles from './styles.scss'

interface Props {
  children: ReactNode
  label?: string
}

const InputItem: React.FC<Props> = ({ children, label }) => (
  <div className={styles.inputItem}>
    {label && <h2 className={styles.label}>{label}</h2>}
    {children}
  </div>
)

export default InputItem
