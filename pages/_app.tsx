import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withReduxStore from '../redux/lib/with-redux-store'
import '../components/styles/_reset.scss'

class MyApp extends App {
  props: any
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
