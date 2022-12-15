import {Tasks} from './Tasks/Tasks';
import s from '../Style/Todolists.module.css'
import {TodolistServerType} from '../../../types/CommonTypes';
import {EditableSpan} from '../../../components/EditableSpan';
import {useAppDispatch} from '../../../utils/hooks';
import {changeTodolistTitle, removeTodolist} from '../TodolistsReducer';
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
  /*const buttonRender = (filter:FilterType) => {
    let style = ''
    const clickButton = () =>{
      console.log('click')
      style = 'active'
    }
    return <Button className={style} name={filter} callback={clickButton}/>
  }*/

  const changeFilterAll = () => {
    console.log('click')
  }
  const changeFilterActive = () => {
    console.log('click')
  }
  const changeFilterCompleted = () => {
    console.log('click')
  }


  return <div className={s.todolist}>
    <div className={s.title}>
      <EditableSpan title={props.todolist.title} changeTitle={changeTitle}/>
      <Button name="Delete" callback={removeTodolistHandler}/>
    </div>
    <Tasks todolistId={props.todolist.id}/>
    <div className={s.buttons}>
      <Button name="All" callback={changeFilterAll}/>
      <Button name="Active" callback={changeFilterActive}/>
      <Button name="Completed" callback={changeFilterCompleted}/>
    </div>
  </div>
}