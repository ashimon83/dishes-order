import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SelectBox from '..'
afterEach(cleanup)

describe('SelectBox', () => {
  it('shows error text when errorMessage is set', () => {
    const { getByText } = render(
      <SelectBox
        options={[{ key: 'test', value: 'test' }]}
        errorMessage="ERROR"
        handleOnChange={() => {}}
      />
    )
    expect(getByText('ERROR'))
  })
})
