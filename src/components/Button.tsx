import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './CommonStyle.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ButtonPropsType=DefaultButtonPropsType & {
  name: string,
  callback: () => void,
}

export const Button: React.FC<ButtonPropsType> = ({name, callback, className}) =>{
  const onClickHandler = () => {
    callback()
  }

  return(
      <button className={s.button + className}  onClick={onClickHandler}>{name}</button>
  )
}