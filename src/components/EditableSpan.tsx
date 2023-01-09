import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';

type EditableSpanType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [value, setValue] = useState<string>(props.title)
  const onEditHandler = () => setEditMode(true)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  const offEditMode = useCallback(() => {
    if(value === ''){
      setValue(props.title)
    }
    setEditMode(false)
    props.changeTitle(value)
  }, [value, props.changeTitle])
  const onPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && offEditMode()
  },[offEditMode])
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
})