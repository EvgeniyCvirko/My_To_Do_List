import React from 'react';
import s from '../../feature/Auth/Login.module.css'
import {LoginDataType} from '../../types/CommonTypes';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

type LoginFormType = {
  captcha: boolean | null
}
export const LoginForm: React.FC<InjectedFormProps<LoginDataType, LoginFormType> & LoginFormType> = (props) => {
  const {handleSubmit} = props

  return <form onSubmit={handleSubmit}>
    <div className={s.email}>
      <label>Email:</label>
      <Field name="email" component="input" type="email" placeholder="email"/>
    </div>
    <div className={s.password}>
      <label>Password:</label>
      <Field name="password" component="input" placeholder="password" type="password"/>
    </div>
    <div className={s.rememberMe}>
      <Field name="rememberMe" component="input" type="checkbox"/>
      <span>Remember me</span>
    </div>
    <button type="submit" className={s.button}>Sing In</button>
  </form>
}

export const ReduxLoginForm = reduxForm<LoginDataType, LoginFormType>({
  form: 'login'
})(LoginForm)