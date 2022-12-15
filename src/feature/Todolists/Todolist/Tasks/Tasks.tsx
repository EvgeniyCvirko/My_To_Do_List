import {Task} from './Task/Task';
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks';
import {useEffect} from 'react';
import {addTasks, getTasks} from './TasksReducer';
import {AddItemForm} from '../../../../components/AddItemForm';
import s from './../../Style/Todolists.module.css'

type TasksPropsType = {
  todolistId: string
}
export const Tasks = (props: TasksPropsType) => {
  const tasks = useAppSelector(state => state.tasks[props.todolistId])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasks(props.todolistId))
  }, [])


  const addTask = (title: string) => {
    dispatch(addTasks({todolistId: props.todolistId, title}))
  }

  const task = tasks.length ?
    tasks.map((t, i) =>
      <Task key={i}
            taskTitle={t.title}
            todolistId={t.todoListId}
            taskId={t.id}
            status={t.status}/>)
    : <span>{'Нет в списке задач'}</span>
  return <div className={s.tasks}>
    <AddItemForm addItem={addTask}/>
    {
      task
    }
  </div>
}