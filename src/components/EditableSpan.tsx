import {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [value, setValue] = useState<string>(props.title)
  const onEditHandler = () => setEditMode(true)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  const offEditMode = () => {
    if(value === ''){
      setValue(props.title)
    }
    props.changeTitle(value)
    setEditMode(false)
  }
  const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.code === 'Enter' && offEditMode()
  return <div>
    {
      editMode ?
        <input autoFocus
               value={value}
               onChange={onChangeHandler}
               onBlur={offEditMode}
               onKeyPress={onPressHandler}/>
        : <span onDoubleClick={onEditHandler}>{props.title}</span>
    }
  </div>
}