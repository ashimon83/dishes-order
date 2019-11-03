import React from 'react'
import styles from './styles.scss'

interface Props {
  currentNav: string
}

const NavBar: React.FC<Props> = ({ currentNav }) => {
  return (
    <nav className={styles.wrap}>
      <ul className={styles.navBar}>
        <li className={styles.navItem}>STEP1</li>
        <li className={styles.navItem}>STEP2</li>
        <li className={styles.navItem}>STEP3</li>
        <li className={styles.navItem}>review</li>
      </ul>
    </nav>
  )
}

export default NavBar
