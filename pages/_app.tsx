import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import configStore from '../redux/store'
import '../components/styles/_reset.scss'

class MyApp extends App {
  render() {
    const store = configStore()
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyApp
