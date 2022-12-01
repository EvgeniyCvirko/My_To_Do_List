import {Tasks} from './Tasks/Tasks';
import s from '../Style/Todolists.module.css'
import {TodolistType} from '../../../types/CommonTypes';

type TodolistPropsType = {
  todolist: TodolistType
}

export const Todolist = (props:TodolistPropsType ) =>{
  return <div className={s.todolist}>
    <p>{props.todolist.title}</p>
    <Tasks  todolistId={props.todolist.id}/>
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>
}