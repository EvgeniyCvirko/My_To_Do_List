import {ChangeEvent, KeyboardEvent, useState} from 'react';

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

  return <div>
    <input autoFocus
           value={value}
           onChange={addFormHandler}
           onKeyPress={onKeyHandler}/>
  </div>
}