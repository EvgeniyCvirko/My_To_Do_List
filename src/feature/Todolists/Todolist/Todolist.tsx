import {Tasks} from './Tasks/Tasks';
import s from '../Style/Todolists.module.css'
import {TodolistType} from '../../../types/CommonTypes';
import { EditableSpan } from '../../../components/EditableSpan';
import { useAppDispatch } from '../../../utils/hooks';
import { changeTodolistTitle, removeTodolist } from '../TodolistsReducer';

type TodolistPropsType = {
  todolist: TodolistType
}

export const Todolist = (props:TodolistPropsType ) =>{
  const dispatch = useAppDispatch()
const changeTitle = (title: string) => {
  dispatch(changeTodolistTitle({ todolistId: props.todolist.id, title}))
}

const removeTodolistHandler = () => {
dispatch(removeTodolist(props.todolist.id))
}

  return <div className={s.todolist}>
    <div>
    <EditableSpan text={props.todolist.title} changeTitle={changeTitle} />
    <button onClick={removeTodolistHandler}>Delete</button>
    </div>
    <Tasks  todolistId={props.todolist.id}/>
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>
}