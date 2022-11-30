import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { TaskApi } from '../../../../api/TaskApi';
import { TaskType } from '../../../../types/CommonTypes';
import { getTodolists } from '../../TodolistsReducer';


type FieldErrorType = { field: string; error: string }
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }

//thunk
export const getTasks = createAsyncThunk<{todolistId: string, tasks:TaskType[]}, string, ThunkError>(
  'tasks/get', async (todolistId: string, thunkApi) => {
    
    try {
      const res = await TaskApi.getTasks(todolistId)
      const tasks = res.data.items
      return {todolistId, tasks } 
    } catch {
      thunkApi.dispatch(getTodolists())
    }
  }
)

type initialStateType = {
  [key: string] : TaskType[]
}
//state
export const slice = createSlice({
  name: 'tasks',
  initialState: {} as initialStateType,
  reducers: {
    
    },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
         state[action.payload?.todolistId] = action.payload?.tasks
    })
  },
})
export const tasksReducer = slice.reducer
//actions