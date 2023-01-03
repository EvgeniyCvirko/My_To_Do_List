import React from 'react';
import {WrappedFieldProps} from 'redux-form';
import './FormControl.css'

export const Input: React.FC<WrappedFieldProps> = (props) => {
const {input, meta:{touched,error},...restProps} = props
  const hasError = touched && error
 return ( <div>
    <div>
      <input {...input} {...restProps} />
      {hasError&& <span className='error'>{error}</span>}
    </div>
  </div>)
}
