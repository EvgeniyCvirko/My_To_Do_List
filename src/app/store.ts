import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import {tasksReducer} from '../feature/Todolists/Todolist/Tasks/TasksReducer';
import {todolistsReducer} from '../feature/Todolists/TodolistsReducer';
import {appReducer} from './AppReducer';
import {loginReducer} from '../feature/Auth/LoginReducer';
import {reducer as formReducer} from 'redux-form'

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: loginReducer,
  form: formReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})