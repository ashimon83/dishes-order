import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import MainLayout from '../../components/Layouts/MainLayout'
import Footer from '../../components/Layouts/Footer'
import Button from '../../components/atoms/Button'
import { submitOrder } from '../../redux/modules/order'
import styles from './styles.scss'

const Review = () => {
  const dispatch = useDispatch()
  const order = useSelector(state => state.order)
  const { mealType, numOfPeople, restaurant, dishOrders, validSteps } = order
  const router = useRouter()
  useEffect(() => {
    if (!validSteps.step3) {
      router.push('/step3')
    }
  }, [])
  return (
    <MainLayout>
      <section>
        <dl className={styles.reviewItem}>
          <dt className={styles.title}>Meal</dt>
          <dd className={styles.result}>{mealType}</dd>
        </dl>
        <dl className={styles.reviewItem}>
          <dt className={styles.title}>No. of People</dt>
          <dd className={styles.result}>{numOfPeople}</dd>
        </dl>
        <dl className={styles.reviewItem}>
          <dt className={styles.title}>Restaurant</dt>
          <dd className={styles.result}>{restaurant}</dd>
        </dl>
        <dl className={styles.reviewItem}>
          <dt className={styles.title}>Dishes</dt>
          <dd className={styles.result}>
            <ul className={styles.dishesResultList}>
              {dishOrders.map(({ dishName, orderNum }) => (
                <li key={dishName} className={styles.dishesResult}>
                  <span>{dishName}</span>
                  <span>- {orderNum}</span>
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </section>
      <Footer>
        <Button
          text="previous"
          handleOnClick={() => {
            router.push('/step3')
          }}
        />
        <Button
          text="Submit"
          handleOnClick={() => {
            dispatch(submitOrder())
          }}
        />
      </Footer>
    </MainLayout>
  )
}

export default Review
