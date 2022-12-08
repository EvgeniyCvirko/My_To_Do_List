import React from 'react';
import s from './Login.module.css'

export const Login = () => {
  return (<div className={s.loginPage}>
    <div className={s.loginContent}>
      <div className={s.title}>Sing In</div>
      <form>
        <div className={s.email}>
          <p>Email:</p>
        <input type="email"/>
        </div>
        <div className={s.password}>
          <p>Password:</p>
        <input type="password"/>
        </div>
        <div className={s.rememberMe}>
        <input type="checkbox"/>
          <span>Remember me</span>
        </div>
        <button className={s.button}>Sing In</button>
      </form>
    </div>
  </div>)
}