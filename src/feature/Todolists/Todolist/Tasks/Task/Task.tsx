import s from '../../../Style/Todolists.module.css';
import {TaskType} from '../../../../../types/CommonTypes';
import {EditableSpan} from '../../../../../components/EditableSpan';

type TaskPropsType = {
  task: TaskType
}
export const Task = (props: TaskPropsType) =>{
const changeTitle = (newTitle: string) => {
  alert(newTitle)
}
  return <div className={s.task}>
    <input type="checkbox"/>
    <EditableSpan text={props.task.title} changeTitle={changeTitle}/>
    <button>delete</button>
  </div>
}