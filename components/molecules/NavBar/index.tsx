import React from 'react'
import { useRouter } from 'next/router'
import styles from './styles.scss'

interface Props {
  currentNav: string
}

const NavBar: React.FC<Props> = ({ currentNav }) => {
  const route = useRouter()
  const { pathname } = route
  const STEP_NAMES = {
    STEP1: '/',
    STEP2: '/step2',
    STEP3: '/step3',
    review: '/review'
  }
  return (
    <nav className={styles.wrap}>
      <ul className={styles.navBar}>
        {Object.keys(STEP_NAMES).map(name => (
          <li
            key={name}
            className={
              STEP_NAMES[name] === pathname
                ? styles.navItemCurrent
                : styles.navItem
            }
          >
            {name}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
