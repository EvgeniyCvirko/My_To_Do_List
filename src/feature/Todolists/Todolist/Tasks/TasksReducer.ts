import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TaskApi} from '../../../../api/TaskApi';
import {TaskType} from '../../../../types/CommonTypes';
import {createTodolist, getTodolists, removeTodolist} from '../../TodolistsReducer';
import axios from 'axios';
import {AppRootStateType} from '../../../../app/store';
import {ApiTaskType, NewTaskType} from '../../../../api/Types';
import {appSetError, appSetStatus} from '../../../../app/AppReducer';

//thunk
export const getTasks = createAsyncThunk(
  'tasks/get', async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TaskApi.getTasks(todolistId)
      const tasks = res.data.items
      thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
      return {todolistId, tasks}
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkApi.dispatch(appSetStatus({status: 'failed'}))
        thunkApi.dispatch(appSetError({error: error.message}))
        return
      }
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask', async (param: { todolistId: string, taskId: string, newTask: ApiTaskType }, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    const {todolistId, taskId, newTask} = param
    const state = thunkApi.getState() as AppRootStateType
    const task = state.tasks[todolistId].find(e => e.id === taskId)
    if (!task) {
      return thunkApi.rejectWithValue('task is not found')
    }
    const apiTask: NewTaskType = {
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
      thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
      return param
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkApi.dispatch(appSetStatus({status: 'failed'}))
        thunkApi.dispatch(appSetError({error: error.message}))
        return
      }
    }
  }
)

export const addTasks = createAsyncThunk(
  'tasks/create', async (param: { todolistId: string, title: string }, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TaskApi.createTasks(param.todolistId, param.title)
      const data = res.data.data
      thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
      return {todolistId: data.item.todoListId, task: data.item}
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkApi.dispatch(appSetStatus({status: 'failed'}))
        thunkApi.dispatch(appSetError({error: error.message}))
        return
      }
    }
  }
)
export const deleteTask = createAsyncThunk(
  'tasks/delete', async (param: { todolistId: string, taskId: string }, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    const {todolistId, taskId} = param
    try {
      const res = await TaskApi.deleteTask(todolistId, taskId)
      thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
      return {todolistId, taskId}
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkApi.dispatch(appSetStatus({status: 'failed'}))
        thunkApi.dispatch(appSetError({error: error.message}))
        return
      }
    }
  }
)

type initialStateType = {
  [key: string]: TaskType[]
}
const initialState: initialStateType = {}
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
        const task = state[action.payload.todolistId]
        const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload?.taskId)
        if (index > -1) {
          task[index] = {...task[index], ...action.payload.newTask}
        }
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
        state[action.payload.todolistId] = [...state[action.payload.todolistId], action.payload.task]
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload?.taskId)
        state[action.payload.todolistId].splice(index, 1)
      }
    });

  },
})
export const tasksReducer = slice.reducer
//actions
