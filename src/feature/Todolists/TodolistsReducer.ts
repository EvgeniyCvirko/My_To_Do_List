import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilterType, TodolistServerType} from '../../types/CommonTypes';
import {TodolistApi} from '../../api/TodolistApi';
import {appSetStatus} from '../../app/AppReducer';


//thunk
export const getTodolists = createAsyncThunk(
  'todolists/get', async (param, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.getTodolists()
      thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
      return {todolists: res.data}
    } catch {
    }
  }
)

export const changeTodolistTitle = createAsyncThunk(
  'todolists/update', async (param: { todolistId: string, title: string }, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.updateTodolists(param.todolistId, param.title)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return {todolistId: param.todolistId, title: param.title}
      }
    } catch (error) {
    }
  }
)

export const removeTodolist = createAsyncThunk(
  'todolists/remove', async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.deleteTodolist(todolistId)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return {todolistId}
      }
    } catch {
    }
  }
)

export const createTodolist = createAsyncThunk(
  'todolists/create', async (title: string, thunkApi) => {
    thunkApi.dispatch(appSetStatus({status: 'loading'}))
    try {
      const res = await TodolistApi.createTodolist(title)
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(appSetStatus({status: 'succeeded'}))
        return {todolist: res.data.data.item}
      }
    } catch {
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload.todolists.map(el => ({...el, filter: 'All'}))
      }
    });
    builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.findIndex(el => el.id === action.payload?.todolistId)
        state[index].title = action.payload.title
      }
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.findIndex(el => el.id === action.payload?.todolistId)
        state.splice(index, 1)
      }
    });
    builder.addCase(createTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        state.unshift({...action.payload.todolist, filter: 'All'})
      }
    });
  },
})
export const todolistsReducer = slice.reducer
//actions
export const {changeFilter} = slice.actions