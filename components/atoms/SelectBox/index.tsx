import React from 'react'
import styles from './styles.scss'
import classnames from 'classnames'

interface Props {
  options: Array<any>
  value?: string
  errorMessage?: string
  disabled?: boolean
  handleOnChange: (value: string) => void
}

const SelectBox: React.FC<Props> = ({
  options,
  value = 'heading-select',
  errorMessage,
  disabled,
  handleOnChange
}) => {
  return (
    <>
      <select
        className={classnames(styles.select, {
          [styles.selectError]: errorMessage
        })}
        value={value}
        onChange={e => handleOnChange(e.target.value)}
        disabled={disabled}
      >
        <option value="heading-select" key="heading-select">
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
