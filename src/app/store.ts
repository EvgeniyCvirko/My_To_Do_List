import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import {todolistsReducer} from '../feature/Todolists/TodolistsReducer';

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
})
export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>getDefaultMiddleware().prepend(thunkMiddleware)
})