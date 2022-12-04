import {Tasks} from './Tasks/Tasks';
import s from '../Style/Todolists.module.css'
import {TodolistType} from '../../../types/CommonTypes';
import { EditableSpan } from '../../../components/EditableSpan';
import { useAppDispatch } from '../../../utils/hooks';
import { changeTodolistTitle } from '../TodolistsReducer';

type TodolistPropsType = {
  todolist: TodolistType
}

export const Todolist = (props:TodolistPropsType ) =>{
  const dispatch = useAppDispatch()
const changeTitle = (title: string) => {
  dispatch(changeTodolistTitle({ todolistId: props.todolist.id, title}))

}
  return <div className={s.todolist}>
    <EditableSpan text={props.todolist.title} changeTitle={changeTitle} />
    <Tasks  todolistId={props.todolist.id}/>
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>
}