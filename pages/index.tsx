import React from 'react'
import MainLayout from '../components/Layouts/MainLayout'
import InputItem from '../components/Layouts/InputItem'
import SelectBox from '../components/atoms/SelectBox'
import styles from './styles.scss'
const PEOPLE_MAX_COUNT: number = 10

const Step1 = () => (
  <MainLayout>
    <section className={styles.step1}>
      <InputItem label="Please Select a meal">
        <SelectBox
          options={[
            { key: 'breakfast', value: 'breakfast' },
            { key: 'lunch', value: 'lunch' },
            { key: 'dinner', value: 'dinner' }
          ]}
          handleOnChange={value => {
            console.log(value)
          }}
        />
      </InputItem>
      <InputItem label="Please Enter Number of people">
        <SelectBox
          options={[...Array(PEOPLE_MAX_COUNT).keys()].map(key => ({
            key: key + 1,
            value: key + 1
          }))}
          handleOnChange={value => {
            console.log(value)
          }}
        />
      </InputItem>
    </section>
  </MainLayout>
)

export default Step1
