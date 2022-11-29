import {createAsyncThunk, createReducer, createSlice} from '@reduxjs/toolkit';
import {TodolistType} from '../../types/CommonTypes';
import {TodolistApi} from '../../api/TodolistApi';

//thunk
export const getTodolists = createAsyncThunk< {todolists: []},  }>(
  'todolists/get',async (param, thunkAPI) => {
    try {
      const response = await TodolistApi.getTodolists()
      console.log(response.data)
      return {todolists: response.data}
    } catch {

    }

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
        return
    })
  },
})
export const todolistsReducer = slice.reducer
//actions