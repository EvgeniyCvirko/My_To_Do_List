import {Tasks} from './Tasks/Tasks';
import s from '../Style/Todolists.module.css'

export const Todolist = () =>{
  return <div className={s.todolist}>
    <p>Title</p>
    <Tasks />
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>
}