import React, { ReactNode } from 'react'
import styles from './styles.scss'

interface Props {
  children: ReactNode
}

const Footer: React.FC<Props> = ({ children }) => (
  <div className={styles.footer}>{children}</div>
)

export default Footer
