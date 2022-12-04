import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { TaskApi } from '../../../../api/TaskApi';
import {TaskType} from '../../../../types/CommonTypes';
import { getTodolists } from '../../TodolistsReducer';
import axios from 'axios';
import {AppRootStateType} from '../../../../app/store';
import { ApiTaskType, NewTaskType } from '../../../../api/Types';


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

export const changeTitleTask = createAsyncThunk(
  'tasks/updateTitle', async (param:{todolistId: string, taskId: string, newTask:ApiTaskType}, thunkApi) => {
    const {todolistId, taskId,newTask } = param
    const state = thunkApi.getState() as AppRootStateType
    const task = state.tasks[todolistId].find(e => e.id === taskId)
    if(!task) {
     return thunkApi.rejectWithValue("task is not found")
    }
    const apiTask:NewTaskType = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...newTask,
    }
    try {
      const res = await TaskApi.updateTask(todolistId, taskId, apiTask)
      return {todolistId, task: res.data.items }
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
    });
    builder.addCase(getTodolists.fulfilled, (state, action) => {
     if (action.payload) {
        action.payload.todolists.forEach(el => state[el.id] = [])
      }
    });
    builder.addCase(changeTitleTask.fulfilled, (state, action) => {
      if (action.payload) {
        const newTask = action.payload.task
        state[action.payload.todolistId].map(el => el.id === action.payload?.task.id ? el=newTask : el )
      }
    });
  },
})
export const tasksReducer = slice.reducer
//actions