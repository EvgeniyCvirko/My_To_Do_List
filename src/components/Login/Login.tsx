import React from 'react';
import s from './Login.module.css'
import {LoginForm} from './LoginForm';

export const Login = () => {
  return (<div className={s.loginPage}>
    <div className={s.loginContent}>
      <div className={s.title}>Sing In</div>
      <LoginForm/>
    </div>
  </div>)
}