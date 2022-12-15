import s from '../../../Style/Todolists.module.css';
import {EditableSpan} from '../../../../../components/EditableSpan';
import {useAppDispatch} from '../../../../../utils/hooks';
import {deleteTask, updateTask} from '../TasksReducer';
import {Button} from '../../../../../components/Button';

type TaskPropsType = {
  taskTitle: string
  todolistId: string
  taskId: string
}
export const Task = (props: TaskPropsType) => {
const dispatch = useAppDispatch()
  const changeTitle = ( title: string) => {
    dispatch(updateTask({todolistId: props.todolistId, taskId: props.taskId, newTask: {title}}))
  }


  const deleteHandler = () => {
dispatch(deleteTask({todolistId: props.todolistId, taskId: props.taskId}))
  }
  return <div className={s.task}>
    <input type="checkbox" />
    <EditableSpan text={props.taskTitle} changeTitle={changeTitle}/>
    <Button name='Delete' callback={deleteHandler}/>
  </div>
}