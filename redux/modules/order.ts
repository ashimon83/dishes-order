import { handleActions, createAction } from 'redux-actions'
import axios from 'axios'
import { createSelector } from 'reselect'
import { uuid } from '../lib/uuid'

// Domain
const ORDER = 'order/'

// Actions
const UPDATE_MEAL_TYPE = `${ORDER}mealType/update`
const UPDATE_NUM_OF_PEOPLE = `${ORDER}numOfPeople/update`
const UPDATE_RESTAURANT = `${ORDER}restaurant/update`
const UPDATE_DISHES = `${ORDER}dishes/update`
const UPDATE_VALID_STEPS = `${ORDER}validSteps/update`
const ADD_DISH_ORDER = `${ORDER}dishOrders/add`
const REMOVE_DISH_ORDER = `${ORDER}dishOrders/remove`
const UPDATE_ORDER = `${ORDER}order/update`

// Action Creators
export const updateMealType = createAction(UPDATE_MEAL_TYPE)
export const updateNumOfPeople = createAction(UPDATE_NUM_OF_PEOPLE, num => +num)
export const updateRestaurant = createAction(UPDATE_RESTAURANT)
export const updateValidSteps = createAction(UPDATE_VALID_STEPS)
export const addDishOrders = createAction(ADD_DISH_ORDER)
export const removDishOrder = createAction(REMOVE_DISH_ORDER)
export const updateOrder = createAction(UPDATE_ORDER)
const updateDishes = createAction(UPDATE_DISHES)

export const getDishes = () => async dispatch => {
  try {
    const res = await axios.get('/api/getDishes')
    dispatch(updateDishes(res.data.dishes))
  } catch (err) {
    console.log(err)
  }
}

export const submitOrder = () => (dispatch, getState) => {
  const { mealType, numOfPeople, restaurant, dishOrders } = getState().order
  // here ajax will be sent when server code is implemented.
  console.log('this is orders', {
    orders: {
      mealType,
      numOfPeople,
      restaurant,
      dishOrders
    }
  })
}

// Initial State
const initialState = {
  mealType: '',
  numOfPeople: '',
  restaurant: '',
  dishes: [],
  validSteps: {
    step1: false,
    step2: false,
    step3: false
  },
  dishOrders: [
    {
      dishName: '',
      orderNum: 1,
      id: uuid()
    }
  ]
}

// Reducer
export default handleActions<any>(
  {
    [UPDATE_MEAL_TYPE]: (state, { payload }) => ({
      ...state,
      mealType: payload
    }),
    [UPDATE_NUM_OF_PEOPLE]: (state, { payload }) => ({
      ...state,
      numOfPeople: payload
    }),
    [UPDATE_RESTAURANT]: (state, { payload }) => ({
      ...state,
      restaurant: payload
    }),
    [UPDATE_DISHES]: (state, { payload }) => ({
      ...state,
      dishes: payload
    }),
    [UPDATE_VALID_STEPS]: (state, { payload }) => ({
      ...state,
      validSteps: { ...state.validSteps, [payload.stepName]: payload.isValid }
    }),
    [ADD_DISH_ORDER]: state => ({
      ...state,
      dishOrders: [
        ...state.dishOrders,
        { dishName: '', orderNum: 1, id: uuid() }
      ]
    }),
    [REMOVE_DISH_ORDER]: (state, { payload }) => ({
      ...state,
      dishOrders: state.dishOrders.filter((_, index) => payload !== index)
    }),
    [UPDATE_ORDER]: (state, { payload }) => ({
      ...state,
      dishOrders: state.dishOrders.map((orderItem, index) =>
        payload.index === index
          ? { ...orderItem, ...payload.newOrder }
          : orderItem
      )
    })
  },
  initialState
)

// Selector
const getMealTypeSelector = (state: any) => state.order.mealType
const getDishesSelector = (state: any) => state.order.dishes
const getRestanrantSelector = (state: any) => state.order.restaurant
const getDishOrdersSelector = (state: any) => state.order.dishOrders
export const getMatchRestaurantSelector = createSelector(
  [getMealTypeSelector, getDishesSelector],
  (mealType, dishes) => {
    const filterDishes = dishes.filter(
      ({ availableMeals }: { availableMeals: Array<any> }) =>
        availableMeals.includes(mealType)
    )
    const uniqueWithRestaurant = [
      ...new Set(
        filterDishes.map(({ restaurant }: { restaurant: string }) => restaurant)
      )
    ]
    return uniqueWithRestaurant
  }
)

export const getRestaurantsDishesSelector = createSelector(
  [getRestanrantSelector, getDishesSelector],
  (selectedRestaurant, dishes) => {
    const filterDishes = dishes
      .filter(({ restaurant }) => restaurant === selectedRestaurant)
      .map(({ name }) => name)
    return filterDishes
  }
)

export const getTotalDishesOrder = createSelector(
  getDishOrdersSelector,
  dishOrders =>
    dishOrders.reduce(
      (acc, { orderNum }: { orderNum: number }) => acc + orderNum,
      0
    )
)

export const getChoicedDishes = createSelector(
  getDishOrdersSelector,
  dishOrders => [...new Set(dishOrders.map(({ dishName }) => dishName))]
)
