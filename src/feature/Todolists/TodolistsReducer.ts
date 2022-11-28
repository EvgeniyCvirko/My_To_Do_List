import {createAsyncThunk, createReducer, createSlice} from '@reduxjs/toolkit';
import {TodolistType} from '../../types/CommonTypes';
import {TodolistApi} from '../../api/TodolistApi';

//thunk
export const getTodolists = createAsyncThunk(
  'todolists/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await TodolistApi.getTodolists()
    return response.data
  }
)

//state
export const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistType[],
  reducers: {
    usersReceived(state, action) {
      }
    },
  extraReducers: (builder) => {
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  },
})
export const todolistsReducer = slice.reducer
/*const todolistsReducer = createReducer([], (builder) => {
  builder
    .addCase('REMOVE_TODO', (state, action) => {
      // Can still return an immutably-updated value if we want to
      return state.filter((todo, i) => i !== action.payload.index)
    })
})*/


//actions