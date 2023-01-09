import s from '../../../Style/Todolists.module.css';
import {EditableSpan} from '../../../../../components/EditableSpan';
import {useAppDispatch} from '../../../../../utils/hooks';
import {deleteTask, updateTask} from '../TasksReducer';
import {Button} from '../../../../../components/Button';
import {TaskStatues} from '../../../../../types/CommonTypes';
import React from 'react';

type TaskPropsType = {
  taskTitle: string
  todolistId: string
  taskId: string
  status: TaskStatues
}
export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch()
  const changeTitle = (title: string) => {
    dispatch(updateTask({todolistId: props.todolistId, taskId: props.taskId, newTask: {title}}))
  }
  const changeStatusTask = (newIsDone: boolean) => {
    let status
    newIsDone ? status = 2 : status = 0
    dispatch(updateTask({todolistId: props.todolistId, taskId: props.taskId, newTask: {status}}))
  }
  const deleteHandler = () => {
    dispatch(deleteTask({todolistId: props.todolistId, taskId: props.taskId}))
  }
  return <div className={props.status === TaskStatues.Completed ? s.taskCompleated : s.task}>
    <input type="checkbox" checked={props.status === TaskStatues.Completed}
           onChange={(e) => changeStatusTask(e.currentTarget.checked)}/>
    <EditableSpan title={props.taskTitle} changeTitle={changeTitle}/>
    <Button name="Delete" callback={deleteHandler}/>
  </div>
})