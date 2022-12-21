import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './CommonStyle.module.css'
import {Button} from './Button';

type AddItemFormType = {
  addItem: (title: string) => void
}
export const AddItemForm = React.memo((props:AddItemFormType ) => {
  const [value, setValue] = useState<string>('Title')
  const [error, setError] = useState<string | null>(null)
  console.log('render add item')
  const addFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setValue(e.currentTarget.value)
  }
  const onKeyHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      addItemHandler()
    }
  }
  const addItemHandler= () => {
      if (value.trim() !== ''){
        props.addItem(value)
        setValue('')
        setError(null)
      } else {
        setError('Title is Title is required')
      }

  }

  return(<div className={s.addItemForm}>
    <div className={error ? s.error : s.input}>
      <input autoFocus
             value={value}
             onChange={addFormHandler}
             onKeyPress={onKeyHandler}/>
      {error && <div>{error}</div>}
    </div>
    <Button name='+' callback={addItemHandler}/>
  </div>)
})