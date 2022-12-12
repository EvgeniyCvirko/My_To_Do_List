import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthApi} from '../api/AuthApi';
import {setIsLogin} from '../feature/Auth/LoginReducer';



//thunk
export const setIsInitialized = createAsyncThunk(
  'app/me', async (param,thunkApi) => {
    try {
      const res = await AuthApi.authMe()
      if (res.data.resultCode === 0) {
thunkApi.dispatch(setIsLogin({isLogin:true}))
      }
      return {isInitialized: true}
    } catch {}
  }
)

//state
export const slice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false
  } ,
  reducers: {
   },
  extraReducers: (builder) => {
    builder.addCase(setIsInitialized.fulfilled, (state, action) => {
      if (action.payload) {
        state.isInitialized = action.payload.isInitialized
      }
    });
  }
})
export const appReducer = slice.reducer
//actions