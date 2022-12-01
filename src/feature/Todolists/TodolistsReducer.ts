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
    })
  },
})
export const todolistsReducer = slice.reducer
//actions