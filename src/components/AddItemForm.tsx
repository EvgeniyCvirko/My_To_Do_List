import {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './CommonStyle.module.css'
import {Button} from './Button';

type AddItemFormType = {
  addItem: (title: string) => void
}
export const AddItemForm = (props:AddItemFormType ) => {
  const [value, setValue] = useState<string>('')
  const addFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const onKeyHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      props.addItem(value)
      setValue('')
    }
  }
  const addItemHandler= () => {
      props.addItem(value)
      setValue('')
  }

  return(<div className={s.addItemForm}>
    <div className={s.input}>
      <input autoFocus
             value={value}
             onChange={addFormHandler}
             onKeyPress={onKeyHandler}/>
    </div>
    <Button name='+' callback={addItemHandler}/>
  </div>)
}