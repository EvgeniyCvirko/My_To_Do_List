import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TaskApi} from '../../../../api/TaskApi';
import {TaskType} from '../../../../types/CommonTypes';
import {createTodolist, getTodolists, removeTodolist} from '../../TodolistsReducer';
import {AppRootStateType} from '../../../../app/store';
import {ApiTaskType, NewTaskType, ThunkError} from '../../../../api/Types';
import { appSetStatus} from '../../../../app/AppReducer';
import {asyncServerAppError, asyncServerNetworkError} from '../../../../utils/error--utils';

//thunk
export const getTasks = createAsyncThunk<{ todolistId: string, tasks: TaskType[] }, string, ThunkError>(
  'tasks/get', async (todolistId, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TaskApi.getTasks(todolistId)
      const tasks = res.data.items
      thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
      return {todolistId, tasks}
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error, true)
    }
  }
)

export const updateTask = createAsyncThunk<{ todolistId: string, taskId: string, newTask: ApiTaskType }, { todolistId: string, taskId: string, newTask: ApiTaskType }, ThunkError>(
  'tasks/updateTask', async (param: { todolistId: string, taskId: string, newTask: ApiTaskType }, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    const {todolistId, taskId, newTask} = param
    const state = thunkApi.getState() as AppRootStateType
    const task = state.tasks[todolistId].find(e => e.id === taskId)
    if (!task) {
      return thunkApi.rejectWithValue({errors: 'task is not found'})
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
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return param
      } else {
        return asyncServerAppError(thunkApi, res.data)
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error, true)
    }
  }
)

export const addTasks = createAsyncThunk<TaskType, { todolistId: string, title: string }, ThunkError>('tasks/create',
  async (param, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TaskApi.createTasks(param.todolistId, param.title)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return res.data.data.item
      } else {
        return asyncServerAppError(thunkApi, res.data, false)
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error, true)
    }
  }
)

export const deleteTask = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }, ThunkError>(
  'tasks/delete', async (param, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    const {todolistId, taskId} = param
    try {
      const res = await TaskApi.deleteTask(todolistId, taskId)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return {todolistId, taskId}
      } else {
        return asyncServerAppError(thunkApi, res.data)
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error, true)
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
      state[action.payload.todolistId] = action.payload.tasks
    });
    builder.addCase(getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach(el => state[el.id] = [])
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const task = state[action.payload.todolistId]
      const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
      if (index > -1) {
        task[index] = {...task[index], ...action.payload.newTask}
      }
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
    });
    builder.addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
    });
    builder.addCase(addTasks.fulfilled, (state, action) => {
      state[action.payload.todoListId] = [action.payload, ...state[action.payload.todoListId]]
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload?.taskId)
      state[action.payload.todolistId].splice(index, 1)
    });

  },
})
export const tasksReducer = slice.reducer
//actions
