import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { TaskApi } from '../../../../api/TaskApi';
import { TaskType } from '../../../../types/CommonTypes';
import { getTodolists } from '../../TodolistsReducer';
import axios from 'axios';


type FieldErrorType = { field: string; error: string }
type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }

//thunk
export const getTasks = createAsyncThunk(
  'tasks/get', async (todolistId: string, thunkApi) => {

    try {
      const res = await TaskApi.getTasks(todolistId)
      const tasks = res.data.items
      return {todolistId, tasks } 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return
      }
    }
  }
)

type initialStateType = {
  [key: string] : TaskType[]
}
const initialState:initialStateType = {}
//state
export const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
     if (action.payload) {
        state[action.payload.todolistId] = action.payload.tasks
      }
    })
    builder.addCase(getTodolists.fulfilled, (state, action) => {
     if (action.payload) {
        action.payload.todolists.forEach(el => state[el.id] = [])
      }
    })
  },
})
export const tasksReducer = slice.reducer
//actions