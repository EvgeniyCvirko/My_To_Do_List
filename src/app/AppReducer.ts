import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthApi} from '../api/AuthApi';
import {setIsLogin} from '../feature/Auth/LoginReducer';
import {StatusType} from '../types/CommonTypes';
import {ThunkError} from '../api/Types';
import {asyncServerNetworkError} from '../utils/error--utils';


//thunk
export const setIsInitialized = createAsyncThunk<{isInitialized: boolean}, undefined, ThunkError>(
  'app/me', async (param, thunkApi) => {
    try {
      const res = await AuthApi.authMe()
      if (res.data.resultCode === 0) {
        thunkApi.dispatch(setIsLogin({isLogin: true}))
      }
        return {isInitialized: true}
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error)
    }
  }
)

//state
export const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null,
    isInitialized: false
  } as InitialStateType,
  reducers: {
    appSetStatus(state, action: PayloadAction<{ status: StatusType }>) {
      state.status = action.payload.status
    },
    appSetError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setIsInitialized.fulfilled, (state, action) => {
      state.isInitialized = action.payload.isInitialized
    });
  }
})
export const appReducer = slice.reducer
//actions
export const appSetStatus = slice.actions.appSetStatus
export const appSetError = slice.actions.appSetError
//type
export type InitialStateType = {
  status: StatusType
  error: string | null
  isInitialized: boolean,
}