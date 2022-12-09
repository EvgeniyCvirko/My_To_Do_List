import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {LoginApi} from '../../api/LoginApi';
import {LoginDataType} from '../../types/CommonTypes';



//thunk
export const setLogin = createAsyncThunk(
  'login/set', async (LoginData:LoginDataType) => {
    try {
      const res = await LoginApi.setLogin(LoginData)
      if (res.data.resultCode === 0) {
        return {isLogin: true}
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
   },
  extraReducers: (builder) => {
    builder.addCase(setLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogin = action.payload.isLogin
      }
    });
  }
})
export const loginReducer = slice.reducer
//actions