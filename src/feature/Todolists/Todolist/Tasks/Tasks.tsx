import {Task} from './Task/Task';
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks';
import {useEffect} from 'react';
import {getTasks} from './TasksReducer';

type TasksPropsType = {
  todolistId: string
}
export const Tasks = (props: TasksPropsType) =>{
  const tasks = useAppSelector(state => state.tasks[props.todolistId])
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTasks(props.todolistId))
  }, [])
  const task = tasks.length ?
    tasks.map(t =>
    <Task task={t}/>)
    :<span>{'Нет в списке задач'}</span>
  return <div >
    {
      task
    }
  </div>
}