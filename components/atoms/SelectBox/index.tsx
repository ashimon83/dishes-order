import React, { useState } from 'react'
import styles from './styles.scss'
import classnames from 'classnames'

interface Props {
  options: Array<any>
  value?: any
  errorMessage?: string
  disabled?: boolean
  handleOnChange: (value: any) => void
}

const SelectBox: React.FC<Props> = ({
  options,
  value = 'heading-select',
  errorMessage,
  disabled,
  handleOnChange
}) => {
  const [_value, setValue] = useState(value)
  return (
    <>
      <select
        className={classnames(styles.select, {
          [styles.selectError]: errorMessage
        })}
        value={_value}
        onChange={e => {
          const selectedValue = e.target.value
          setValue(selectedValue)
          handleOnChange(selectedValue)
        }}
        disabled={disabled}
      >
        <option value="" key="">
          --
        </option>
        {options &&
          options.map(({ key, value }) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
      </select>
      {errorMessage && (
        <small className={styles.errorText}>{errorMessage}</small>
      )}
    </>
  )
}

export default SelectBox
