import { createStore, combineReducers } from 'redux'

import settings from './settings'

const rootReducer = combineReducers({
  settings
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer)
