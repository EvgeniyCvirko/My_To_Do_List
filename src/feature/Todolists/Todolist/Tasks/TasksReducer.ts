import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { TaskApi } from '../../../../api/TaskApi';
import {TaskType} from '../../../../types/CommonTypes';
import {createTodolist, getTodolists, removeTodolist} from '../../TodolistsReducer';
import axios from 'axios';
import {AppRootStateType} from '../../../../app/store';
import { ApiTaskType, NewTaskType } from '../../../../api/Types';

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

export const updateTask = createAsyncThunk(
  'tasks/updateTask', async (param:{todolistId: string, taskId: string, newTask:ApiTaskType}, thunkApi) => {
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
      return {todolistId, task: res.data.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return
      }
    }
  }
)

export const addTasks = createAsyncThunk(
  'tasks/create', async (param:{todolistId: string, title: string}, thunkApi) => {
    try {
      const res = await TaskApi.createTasks(param.todolistId, param.title)
      const data = res.data.data
      return {todolistId: data.item.todoListId, task: data.item }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return
      }
    }
  }
)
export const deleteTask = createAsyncThunk(
  'tasks/delete', async (param:{todolistId: string, taskId: string}, thunkApi) => {
    const {todolistId, taskId} = param
    try {
      const res = await TaskApi.deleteTask(todolistId, taskId)
      return {todolistId, taskId }
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
    builder.addCase(updateTask.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload?.task.id)
        state[action.payload.todolistId].splice(index,1, action.payload.task)
        //const newTask = action.payload.task
        //state[action.payload.todolistId].map(el => el.id === action.payload?.task.id ? el=newTask : el )
      }
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        delete state[action.payload.todolistId]
      }
    });
    builder.addCase(createTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.todolist.id] = []
      }
    });
    builder.addCase(addTasks.fulfilled, (state, action) => {
      if (action.payload) {
          state[action.payload.todolistId] = [...state[action.payload.todolistId] ,action.payload.task]
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload?.taskId)
        state[action.payload.todolistId].splice(index,1)
      }
    });

  },
})
export const tasksReducer = slice.reducer
//actions
