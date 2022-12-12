import React from 'react';
import s from './Login.module.css'
import {ReduxLoginForm} from '../../components/Login/LoginForm';
import {LoginDataType} from '../../types/CommonTypes';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {setLogin} from './LoginReducer';
import {Navigate} from 'react-router-dom';

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLogin =  useAppSelector(state => state.login.isLogin)
  const onSubmit = (loginData: LoginDataType) => {
    const Login = {
      rememberMe: loginData.rememberMe,
      email: loginData.email,
      password: loginData.password,
      captcha: null
    }
    dispatch(setLogin({LoginData:Login}))
  }
if(isLogin){
  return <Navigate to={"/"}/>
}
  return (<div className={s.loginPage}>
    <div className={s.loginContent}>
      <div className={s.title}>Sing In</div>
      <ReduxLoginForm onSubmit={onSubmit} captcha={null}/>
    </div>
  </div>)
}