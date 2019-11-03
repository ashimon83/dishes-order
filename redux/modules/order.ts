import { handleActions, createAction } from 'redux-actions'
import axios from 'axios'
import { createSelector } from 'reselect'

// Domain
const ORDER = 'order/'

// Actions
const UPDATE_MEAL_TYPE = `${ORDER}mealType/update`
const UPDATE_NUM_OF_PEOPLE = `${ORDER}numOfPeople/update`
const UPDATE_RESTAURANT = `${ORDER}restaurant/update`
const UPDATE_DISHES = `${ORDER}dishes/update`
const UPDATE_VALID_STEPS = `${ORDER}validSteps/update`

// Action Creators
export const updateMealType = createAction(UPDATE_MEAL_TYPE)
export const updateNumOfPeople = createAction(UPDATE_NUM_OF_PEOPLE, num => +num)
export const updateRestaurant = createAction(UPDATE_RESTAURANT)
export const updateValidSteps = createAction(UPDATE_VALID_STEPS)
const updateDishes = createAction(UPDATE_DISHES)

export const getDishes = () => async dispatch => {
  try {
    const res = await axios.get('/api/getDishes')
    dispatch(updateDishes(res.data.dishes))
  } catch (err) {
    console.log(err)
  }
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
  }
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
    })
  },
  initialState
)

// Selector
const getMealTypeSelector = (state: any) => state.order.mealType
const getDishesSelector = (state: any) => state.order.dishes
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
