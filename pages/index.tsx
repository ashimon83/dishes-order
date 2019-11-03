import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../components/Layouts/MainLayout'
import InputItem from '../components/Layouts/InputItem'
import Footer from '../components/Layouts/Footer'
import SelectBox from '../components/atoms/SelectBox'
import Button from '../components/atoms/Button'
import {
  updateMealType as _updateMealType,
  updateNumOfPeople as _updateNumOfPeople
} from '../redux/modules/order'
import styles from './styles.scss'
const PEOPLE_MAX_COUNT: number = 10

const Step1 = () => {
  // connect redux
  const dispatch = useDispatch()
  const order = useSelector(state => state.order)
  console.log(order, 'order')
  const { mealType, numOfPeople } = order
  const updateMealType = (mealType: string) =>
    dispatch(_updateMealType(mealType))
  const updateNumOfPeople = (numOfPeople: number) =>
    dispatch(_updateNumOfPeople(numOfPeople))

  const [inputValid, setInputValid] = useState(false)
  const [mealSelected, setMealSelected] = useState(false)
  const [peopleNumSelected, setPeopleNumSelected] = useState(false)
  const [nextButtonTouched, setNextButtonTouched] = useState(false)
  useEffect(() => {
    setInputValid(mealSelected && peopleNumSelected)
  }, [mealSelected, peopleNumSelected])
  const router = useRouter()
  return (
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
              setMealSelected(!!value)
              updateMealType(value)
              console.log(value)
            }}
            errorMessage={
              nextButtonTouched && !mealSelected && 'please select meal'
            }
          />
        </InputItem>
        <InputItem label="Please Enter Number of people">
          <SelectBox
            options={[...Array(PEOPLE_MAX_COUNT).keys()].map(key => ({
              key: key + 1,
              value: key + 1
            }))}
            handleOnChange={value => {
              setPeopleNumSelected(!!value)
              updateNumOfPeople(value)
              console.log(value)
            }}
            errorMessage={
              nextButtonTouched &&
              !peopleNumSelected &&
              'please select number of people'
            }
          />
        </InputItem>
        <Footer>
          <Button
            text="next"
            handleOnClick={() => {
              setNextButtonTouched(true)
              if (inputValid) {
                router.push('/step2')
                return
              }
            }}
          />
        </Footer>
      </section>
    </MainLayout>
  )
}

export default Step1
