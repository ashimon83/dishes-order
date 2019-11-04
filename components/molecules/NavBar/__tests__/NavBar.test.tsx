import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import * as nextRouter from 'next/router'
import NavBar from '..'
afterEach(cleanup)

describe('NavBar', () => {
  it('draw test', () => {
    nextRouter.useRouter = jest.fn()
    nextRouter.useRouter.mockImplementation(() => ({ pathname: '/' }))
    const { getByText } = render(<NavBar />)
    expect(getByText('STEP1'))
  })
  it.todo('if route is step1 navigation of step2 is not emphasis color')
})
