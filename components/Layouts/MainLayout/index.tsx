import React from 'react'
import { Helmet } from 'react-helmet'
import NavBar from '../../molecules/NavBar'
import styles from './styles.scss'
interface Props {
  title?: string
}
const MainLayousst: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={stylesger.main}>
      <Helmet
        defaultTitle="this is dishes-order"
        titleTemplate="%s|dishes-order"
      >
        <title>{title}</title>
      </Helmet>
      <NavBar currentNav="step1" />
      {children}
    </div>
  )
}

export deafult MainLayouttt
