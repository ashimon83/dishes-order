import React from 'react'
import NavBar from '../../molecules/NavBar'
import styles from './styles.scss'

const MainLayout = ({ children }) => {
  return (
    <div className={styles.main}>
      <NavBar currentNav="step1" />
      {children}
    </div>
  )
}

export default MainLayout
