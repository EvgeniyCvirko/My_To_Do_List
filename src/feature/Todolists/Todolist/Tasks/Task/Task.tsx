import s from '../../../Style/Todolists.module.css';
import {TaskType} from '../../../../../types/CommonTypes';
import {EditableSpan} from '../../../../../components/EditableSpan';
import {useAppDispatch} from '../../../../../utils/hooks';
import {deleteTask} from '../TasksReducer';

type TaskPropsType = {
  task: TaskType
  callback: (id: string, title: string) => void
}
export const Task = (props: TaskPropsType) => {
const dispatch = useAppDispatch()

  const changeTitle = (newTitle: string) => {
    props.callback(props.task.id, newTitle)
  }

  const deleteHandler = () => {
dispatch(deleteTask({todolistId: props.task.todoListId, taskId: props.task.id}))
  }
  return <div className={s.task}>
    <input type="checkbox"/>
    <EditableSpan text={props.task.title} changeTitle={changeTitle}/>
    <button onClick={deleteHandler}>delete</button>
  </div>
}