import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../components/Layouts/MainLayout'
import InputItem from '../components/Layouts/InputItem'
import Footer from '../components/Layouts/Footer'
import SelectBox from '../components/atoms/SelectBox'
import Button from '../components/atoms/Button'
import {
  updateMealType,
  updateNumOfPeople,
  updateValidSteps
} from '../redux/modules/order'
import styles from './styles.scss'
const PEOPLE_MAX_COUNT: number = 10

const Step1 = () => {
  // connect redux
  const dispatch = useDispatch()
  const order = useSelector(state => state.order, false)
  const { mealType, numOfPeople, validSteps } = order
  const [nextButtonTouched, setNextButtonTouched] = useState(false)
  useEffect(() => {
    dispatch(
      updateValidSteps({
        stepName: 'step1',
        isValid: !!(mealType && numOfPeople)
      })
    )
  }, [mealType, numOfPeople])
  const router = useRouter()
  return (
    <MainLayout>
      <InputItem label="Please Select a meal">
        <SelectBox
          data-testid="mealSelect"
          value={mealType}
          options={[
            { key: 'breakfast', value: 'breakfast' },
            { key: 'lunch', value: 'lunch' },
            { key: 'dinner', value: 'dinner' }
          ]}
          handleOnChange={mealType => {
            dispatch(updateMealType(mealType))
          }}
          errorMessage={nextButtonTouched && !mealType && 'please select meal'}
        />
      </InputItem>
      <InputItem label="Please Enter Number of people">
        <SelectBox
          data-testid="numOfPeopleSelect"
          value={numOfPeople}
          options={[...Array(PEOPLE_MAX_COUNT).keys()].map(key => ({
            key: key + 1,
            value: key + 1
          }))}
          handleOnChange={numOfPeople => {
            dispatch(updateNumOfPeople(numOfPeople))
          }}
          errorMessage={
            nextButtonTouched &&
            !numOfPeople &&
            'please select number of people'
          }
        />
      </InputItem>
      <Footer>
        <Button
          className={styles.rightButton}
          text="next"
          handleOnClick={() => {
            setNextButtonTouched(true)
            if (validSteps.step1) {
              router.push('/step2')
              return
            }
          }}
        />
      </Footer>
    </MainLayout>
  )
}

export default Step1
