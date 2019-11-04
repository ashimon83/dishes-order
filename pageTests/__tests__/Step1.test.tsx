import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import * as nextRouter from 'next/router'

import Step1 from '../../pages'
afterEach(cleanup)
nextRouter.useRouter = jest.fn()
nextRouter.useRouter.mockImplementation(() => ({ pathname: '/' }))
const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useSelector: () => ({ mealType: '', numOfPeople: '', validSteps: {} }),
  useDispatch: () => mockDispatch
}))

describe('inputs of select', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('shows error when no select', () => {
    const { getByText } = render(<Step1 />)

    fireEvent.click(getByText('next'))

    expect(getByText('please select meal'))
    expect(getByText('please select number of people'))
  })

  // it('ok', () => {
  //   const {getByTestId, getByText} = render(<Step1 />)
  //   fireEvent.change(getByTestId('mealSelect'), {target: {value: 'lunch'}})
  //   fireEvent.click(getByText('next'))
  //   expect(getByText('please select meal'))

  // })
})
