import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TodolistServerType, TodolistType} from '../../types/CommonTypes';
import {TodolistApi} from '../../api/TodolistApi';


type FieldErrorType = { field: string; error: string }
type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
//thunk
export const getTodolists = createAsyncThunk(
  'todolists/get', async () => {
    try {
      const res = await TodolistApi.getTodolists()
      return {todolists: res.data} 
    } catch {}
  }
)

export const changeTodolistTitle = createAsyncThunk(
  'todolists/update', async (param:{todolistId: string, title: string}, thunkApi) => {
    try {
      const res = await TodolistApi.updateTodolists(param.todolistId,param.title)
      if(res.data.resultCode === 0){
      return {todolistId: param.todolistId, title: param.title} 
    }
    } catch {}
  }
)

export const removeTodolist = createAsyncThunk(
  'todolists/remove', async (todolistId: string, thunkApi) => {
    try {
      const res = await TodolistApi.deleteTodolist(todolistId)
      if(res.data.resultCode === 0){
      return { todolistId } 
    }
    } catch {}
  }
)
//state
export const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistServerType [],
  reducers: {
   },
  extraReducers: (builder) => {
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload.todolists.map(el => ({...el, filter: 'all'}))
      }
    });
    builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
      if (action.payload) {
      const index = state.findIndex(el => el.id === action.payload?.todolistId)
      state[index].title = action.payload.title
       // return state.map(td => td.id === action.payload?.todolistId ? {...td,title: action.payload?.title} : td )
            }
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.findIndex(el => el.id === action.payload?.todolistId)
        state.splice(index, 1)
      }
    });
  },
})
export const todolistsReducer = slice.reducer
//actions