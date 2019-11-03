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
  updateRestaurant as _updateRestaurant,
  getMatchRestaurantSelector
} from '../../redux/modules/order'

const Step2 = () => {
  const router = useRouter()
  const order = useSelector(state => state.order)
  const { restaurant } = order
  const matchRestaurantNames = useSelector(getMatchRestaurantSelector)
  const dispatch = useDispatch()
  const updateRestaurant = (restaurant: string) =>
    dispatch(_updateRestaurant(restaurant))
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
  return (
    <MainLayout>
      <InputItem label="Please Select a Restaurant">
        <SelectBox
          value={restaurant}
          options={restaurantOptions}
          errorMessage={nextButtonTouched && !restaurant && 'select restaurant'}
          handleOnChange={restaurant => {
            updateRestaurant(restaurant)
          }}
        />
      </InputItem>
      <Footer>
        <Button
          text="previous"
          handleOnClick={() => {
            router.push('/step2')
          }}
        />
        <Button
          text="next"
          handleOnClick={() => {
            setNextButtonTouched(true)
            if (restaurant) {
              router.push('/step4')
              return
            }
          }}
        />
      </Footer>
    </MainLayout>
  )
}

export default Step2
