import React from 'react';
import s from '../../feature/Auth/Login.module.css'
import {LoginDataType} from '../../types/CommonTypes';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {required, email} from '../../utils/validate/validate';
import {Input} from '../Common/FormControl';

type LoginFormType = {
  captcha: boolean | null
}
export const LoginForm: React.FC<InjectedFormProps<LoginDataType, LoginFormType> & LoginFormType> = (props) => {
  console.log(props.error);
  
  return <form onSubmit={props.handleSubmit}>
    <div className={s.email}>
      <label>Email:</label>
      <Field name="email" component={Input} validate={[required, email]} placeholder="email" />

    </div>
    <div className={s.password}>
      <label>Password:</label>
      <Field name="password" component={Input} validate={[required]} placeholder="password" type="password"/>
    </div>
    <div className={s.rememberMe}>
      <Field name="rememberMe" component="input" type="checkbox"/>
      <span>Remember me</span>
    </div>
    {
      props.captcha &&
        <Field name="captcha" component="input" type="checkbox"/>
    }
    <button type="submit" className={s.button}>Sing In</button>
    {/* {props.error && <div>{props.error}</div>} */}
  </form>
}

export const ReduxLoginForm = reduxForm<LoginDataType, LoginFormType>({
  form: 'login'
})(LoginForm)