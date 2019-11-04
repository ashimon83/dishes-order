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
  updateOrder,
  addDishOrders,
  removDishOrder,
  updateValidSteps,
  getRestaurantsDishesSelector,
  getTotalDishesOrder,
  getChoicedDishes
} from '../../redux/modules/order'
import styles from './styles.scss'
const DISH_MAX_COUNT = 10
const Step3 = () => {
  const router = useRouter()
  const order = useSelector(state => state.order)
  const { dishOrders, numOfPeople, validSteps } = order
  const restaurantsDishes = useSelector(getRestaurantsDishesSelector)
  const totalDishOrderNum = useSelector(getTotalDishesOrder)
  const choicedDishes = useSelector(getChoicedDishes)
  const orderNumValid = totalDishOrderNum >= numOfPeople
  const dispatch = useDispatch()
  const [nextButtonTouched, setNextButtonTouched] = useState(false)
  useEffect(() => {
    dispatch(getDishes())
  }, [])
  const dishesOptions = useMemo(() => {
    return restaurantsDishes.map(name => ({
      key: name,
      value: name
    }))
  }, [restaurantsDishes])
  const isNotEmptyDishName =
    dishOrders.filter(({ dishName }) => !dishName).length === 0
  useEffect(() => {
    dispatch(
      updateValidSteps({
        stepName: 'step3',
        isValid: orderNumValid && isNotEmptyDishName
      })
    )
  }, [orderNumValid, isNotEmptyDishName])
  useEffect(() => {
    if (!validSteps.step2) {
      router.push('/step2')
    }
  }, [])
  return (
    <MainLayout>
      <div>
        {dishOrders.map(({ dishName, orderNum, id }, index) => (
          <div key={id} className={styles.dishInput}>
            <InputItem label="Please Select a Dish">
              <SelectBox
                value={dishName}
                options={dishesOptions.filter(
                  ({ key }) =>
                    !(choicedDishes.includes(key) && dishName !== key)
                )}
                errorMessage={nextButtonTouched && !dishName && 'select dish'}
                handleOnChange={dishName => {
                  dispatch(updateOrder({ index, newOrder: { dishName } }))
                }}
              />
            </InputItem>
            <InputItem label="Please Enter no of Serving">
              <SelectBox
                value={orderNum}
                options={[...Array(DISH_MAX_COUNT).keys()].map(key => ({
                  key: key + 1,
                  value: key + 1
                }))}
                // errorMessage={nextButtonTouched && !restaurant && 'select restaurant'}
                handleOnChange={orderNum => {
                  dispatch(
                    updateOrder({ index, newOrder: { orderNum: +orderNum } })
                  )
                }}
              />
            </InputItem>
            {index !== 0 && (
              <div
                onClick={() => dispatch(removDishOrder(index))}
                className={styles.iconMinus}
              />
            )}
          </div>
        ))}
        <InputItem>
          <div
            onClick={() => {
              dispatch(addDishOrders())
              setNextButtonTouched(false)
            }}
            className={styles.iconPlus}
          />
        </InputItem>
        {nextButtonTouched && !orderNumValid && (
          <p className={styles.errorMessage}>
            Please Choice Dishes (now {totalDishOrderNum}) More than Peolple
            Count ({numOfPeople})
          </p>
        )}
      </div>
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
            if (orderNumValid && isNotEmptyDishName) {
              router.push('/review')
              return
            }
          }}
        />
      </Footer>
    </MainLayout>
  )
}

export default Step3
