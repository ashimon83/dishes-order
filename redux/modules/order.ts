import { handleActions, createAction } from 'redux-actions'

// Domain
const ORDER = 'order/'

// Actions
const UPDATE_MEAL_TYPE = `${ORDER}mealType/update`
const UPDATE_NUM_OF_PEOPLE = `${ORDER}numOfPeople/update`

// Action Creators
export const updateMealType = createAction(UPDATE_MEAL_TYPE)
export const updateNumOfPeople = createAction(UPDATE_NUM_OF_PEOPLE, num => +num)

// Initial State
const initialState = {
  mealType: '',
  numOfPeople: ''
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
    })
  },
  initialState
)
