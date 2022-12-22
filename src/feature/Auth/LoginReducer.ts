import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginApi} from '../../api/LoginApi';
import {LoginDataType} from '../../types/CommonTypes';
import {ThunkError} from '../../api/Types';
import {asyncServerAppError, asyncServerNetworkError} from '../../utils/error--utils';



//thunk
export const setLogin = createAsyncThunk<{isLogin: boolean},{LoginData: LoginDataType}, ThunkError>(
  'login/setLogin', async (param, thunkApi) => {

    try {
      const res = await LoginApi.setLogin(param.LoginData)
      if (res.data.resultCode === 0) {
        return {isLogin: true}
      } else {
        return asyncServerAppError(thunkApi, res.data)
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error)
    }
  }
)

export const setLogout = createAsyncThunk<{isLogin: boolean},undefined, ThunkError>(
  'login/setLogout', async (param,thunkApi) => {

    try {
      const res = await LoginApi.deletLogin()
      if (res.data.resultCode === 0) {
        return {isLogin: false}
      }else {
        return asyncServerAppError(thunkApi, res.data)
      }
    } catch (error: any) {
      return asyncServerNetworkError(thunkApi, error)
    }
  }
)

//state
export const slice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
  } ,
  reducers: {
    setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
      state.isLogin = action.payload.isLogin
    }
   },
  extraReducers: (builder) => {
    builder.addCase(setLogin.fulfilled, (state, action) => {
        state.isLogin = action.payload.isLogin
    });
    builder.addCase(setLogout.fulfilled, (state, action) => {
        state.isLogin = action.payload.isLogin
    });
  }
})
export const loginReducer = slice.reducer
export const {setIsLogin} = slice.actions
//actions