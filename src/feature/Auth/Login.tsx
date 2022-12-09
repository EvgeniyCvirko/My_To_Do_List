import React from 'react';
import s from './Login.module.css'
import {ReduxLoginForm} from '../../components/Login/LoginForm';
import {LoginDataType} from '../../types/CommonTypes';

export const Login = () => {
const onSubmit = (loginData: LoginDataType) => {
  console.log(loginData)
}

  return (<div className={s.loginPage}>
    <div className={s.loginContent}>
      <div className={s.title}>Sing In</div>
      <ReduxLoginForm onSubmit={onSubmit} captcha={null}/>
    </div>
  </div>)
}