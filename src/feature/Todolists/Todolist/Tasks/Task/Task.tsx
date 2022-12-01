import s from '../../../Style/Todolists.module.css';
import {TaskType} from '../../../../../types/CommonTypes';

type TaskPropsType = {
  task: TaskType
}
export const Task = (props: TaskPropsType) =>{

  return <div className={s.task}>
    <input type="checkbox"/>
    <div>{props.task.title}</div>
    <button>delete</button>
  </div>
}