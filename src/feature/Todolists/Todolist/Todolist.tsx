import {Tasks} from './Tasks/Tasks';
import s from '../Style/Todolists.module.css'
import {FilterType, TodolistServerType} from '../../../types/CommonTypes';
import {EditableSpan} from '../../../components/EditableSpan';
import {useAppDispatch} from '../../../utils/hooks';
import {changeFilter, changeTodolistTitle, removeTodolist} from '../TodolistsReducer';
import {Button} from '../../../components/Button';

type TodolistPropsType = {
  todolist: TodolistServerType
}

export const Todolist = (props: TodolistPropsType) => {
  const dispatch = useAppDispatch()
  const changeTitle = (title: string) => {
    dispatch(changeTodolistTitle({todolistId: props.todolist.id, title}))
  }

  const removeTodolistHandler = () => {
    dispatch(removeTodolist(props.todolist.id))
  }

  const renderBtns = (name: FilterType) => {
    const callback = () => dispatch(changeFilter({todolistId: props.todolist.id, filter: name}))
    return <Button name={name} callback={callback}/>
  }

  return <div className={s.todolist}>
    <div className={s.title}>
      <EditableSpan title={props.todolist.title} changeTitle={changeTitle}/>
      <Button name="Delete" callback={removeTodolistHandler}/>
    </div>
    <Tasks todolistId={props.todolist.id} filter={props.todolist.filter}/>
    <div className={s.buttons}>
      {renderBtns('All')}
      {renderBtns('Active')}
      {renderBtns('Compleated')}
    </div>
  </div>
}