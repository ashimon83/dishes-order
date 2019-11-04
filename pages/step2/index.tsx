import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import MainLayout from '../../components/Layouts/MainLayout'
import InputItem from '../../components/Layouts/InputItem'
import Footer from '../../components/Layouts/Footer'
import SelectBox from '../../components/atoms/SelectBox'
import Button from '.././../components/atoms/Button'
import {
  getDishes,
  updateRestaurant,
  getMatchRestaurantSelector,
  updateValidSteps
} from '../../redux/modules/order'

const Step2 = () => {
  const router = useRouter()
  const order = useSelector(state => state.order)
  const { restaurant, validSteps } = order
  const matchRestaurantNames = useSelector(getMatchRestaurantSelector)
  const dispatch = useDispatch()
  const [nextButtonTouched, setNextButtonTouched] = useState(false)
  useEffect(() => {
    dispatch(getDishes())
  }, [])
  const restaurantOptions = useMemo(() => {
    return matchRestaurantNames.map(name => ({
      key: name,
      value: name
    }))
  }, [matchRestaurantNames])
  useEffect(() => {
    dispatch(
      updateValidSteps({
        stepName: 'step2',
        isValid: !!restaurant
      })
    )
  }, [restaurant])
  useEffect(() => {
    if (!validSteps.step1) {
      router.push('/')
    }
  }, [])
  return (
    <MainLayout>
      <InputItem label="Please Select a Restaurant">
        <SelectBox
          value={restaurant}
          options={restaurantOptions}
          errorMessage={nextButtonTouched && !restaurant && 'select restaurant'}
          handleOnChange={restaurant => {
            dispatch(updateRestaurant(restaurant))
          }}
        />
      </InputItem>
      <Footer>
        <Button
          text="previous"
          handleOnClick={() => {
            router.push('/')
          }}
        />
        <Button
          text="next"
          handleOnClick={() => {
            setNextButtonTouched(true)
            if (validSteps.step2) {
              router.push('/step3')
              return
            }
          }}
        />
      </Footer>
    </MainLayout>
  )
}

export default Step2
