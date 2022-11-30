import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { tasksReducer } from '../feature/Todolists/Todolist/Tasks/TasksReducer';
import {todolistsReducer} from '../feature/Todolists/TodolistsReducer';

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
})
export type RootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>getDefaultMiddleware().prepend(thunkMiddleware)
})