import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginApi} from '../../api/LoginApi';
import {LoginDataType} from '../../types/CommonTypes';



//thunk
export const setLogin = createAsyncThunk(
  'login/setLogin', async (param:{LoginData: LoginDataType}) => {

    try {
      const res = await LoginApi.setLogin(param.LoginData)
      if (res.data.resultCode === 0) {
        return {isLogin: true}
      }

    } catch {}
  }
)

export const setLogout = createAsyncThunk(
  'login/setLogout', async () => {

    try {
      const res = await LoginApi.deletLogin()
      if (res.data.resultCode === 0) {
        return {isLogin: false}
      }

    } catch {}
  }
)

//state
export const slice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
  } ,
  reducers: {
    setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>){
      state.isLogin = action.payload.isLogin
    }
   },
  extraReducers: (builder) => {
    builder.addCase(setLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogin = action.payload.isLogin
      }
    });
    builder.addCase(setLogout.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogin = action.payload.isLogin
      }
    });
  }
})
export const loginReducer = slice.reducer
export const {setIsLogin} = slice.actions
//actions