import React from 'react';
import {WrappedFieldProps} from 'redux-form';

export const Input: React.FC<WrappedFieldProps> = (props) => {
const {input, meta:{touched,error},...restProps} = props
  const hasError = touched && error
 return ( <div>
    <div>
      <input {...input} {...restProps} />
      {hasError&& <span>{error}</span>}
    </div>
  </div>)
}
