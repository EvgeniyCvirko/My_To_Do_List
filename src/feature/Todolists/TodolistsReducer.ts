import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilterType, TodolistServerType, TodolistType} from '../../types/CommonTypes';
import {TodolistApi} from '../../api/TodolistApi';
import { appSetStatus} from '../../app/AppReducer';
import {ThunkError} from '../../api/Types';
import {asyncServerAppError, asyncServerNetworkError} from '../../utils/error--utils';
import {getTasks} from './Todolist/Tasks/TasksReducer';


//thunk
export const getTodolists = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>(
  'todolists/get', async (param, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.getTodolists()
      thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
      res.data.forEach(td => {
        thunkApi.dispatch(getTasks(td.id))
      })
      return {todolists: res.data}
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error)
    }
  }
)

export const changeTodolistTitle = createAsyncThunk<{todolistId: string, title: string, order: number}, {todolistId: string, title: string, order: number}, ThunkError>(
  'todolists/update', async (param, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.updateTodolists(param.todolistId, param.title, param.order)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return {todolistId: param.todolistId, title: param.title}
      } else {
        return asyncServerAppError(thunkApi, res.data)
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error)
    }
  }
)
export const changeOrderTodolist = createAsyncThunk<undefined, {todolistId: string, putAfterItemId: string}, ThunkError>(
  'todolists/reorder', async (param, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.reorderTodolists(param.todolistId, param.putAfterItemId)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        thunkApi.dispatch(getTodolists())
      } else {
        return asyncServerAppError(thunkApi, res.data)
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error)
    }
  }
)
export const removeTodolist = createAsyncThunk<{ todolistId: string }, string, ThunkError>(
  'todolists/remove', async (todolistId, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.deleteTodolist(todolistId)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return {todolistId}
      } else {
        return asyncServerAppError(thunkApi, res.data)
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error, true)
    }
  }
)

export const createTodolist = createAsyncThunk<{todolist:TodolistServerType }, string, ThunkError>(
  'todolists/create', async (title: string, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.createTodolist(title)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return {todolist: res.data.data.item}
      } else {
        return asyncServerAppError(thunkApi, res.data, false )
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error, false)
    }
  }
)

//state
export const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistServerType [],
  reducers: {
    changeFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterType }>) {
      const index = state.findIndex(td => td.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
    },
    changeOrderTodolists(state, action: PayloadAction<{ todolists: TodolistServerType[] }>) {
      return state = action.payload.todolists
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      return action.payload.todolists.map(el => ({...el, filter: 'All'}))
      }
    );
    builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(el => el.id === action.payload?.todolistId)
        state[index].title = action.payload.title
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(el => el.id === action.payload?.todolistId)
        state.splice(index, 1)
    });
    builder.addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift({...action.payload.todolist, filter: 'All'})
    });
  },
})
export const todolistsReducer = slice.reducer
//actions
export const {changeFilter, changeOrderTodolists} = slice.actions