import {Task} from './Task/Task';
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks';
import {useEffect} from 'react';
import {addTasks, getTasks} from './TasksReducer';
import {AddItemForm} from '../../../../components/AddItemForm';
import s from './../../Style/Todolists.module.css'
import {FilterType, TaskStatues} from '../../../../types/CommonTypes';

type TasksPropsType = {
  todolistId: string
  filter: FilterType
}
export const Tasks = (props: TasksPropsType) => {
  const tasks = useAppSelector(state => state.tasks[props.todolistId])
  const todolist = useAppSelector(state => state.todolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasks(props.todolistId))
  }, [])


  const addTask = (title: string) => {
    dispatch(addTasks({todolistId: props.todolistId, title}))
  }
  let taskForRender = tasks
  if (props.filter === 'Active') {
    taskForRender = tasks.filter(e => e.status === TaskStatues.New)
  }

  if (props.filter === 'Compleated') {
    taskForRender = tasks.filter(e => e.status === TaskStatues.Completed)
  }

  const task = taskForRender.length ?
    taskForRender.map((t, i) => {
      return <Task key={i}
                   taskTitle={t.title}
                   todolistId={t.todoListId}
                   taskId={t.id}
                   status={t.status}/>
    })
    : <span>{'Нет в списке задач'}</span>
  return <div className={s.tasks}>
    <AddItemForm addItem={addTask}/>
    {
      task
    }
  </div>
}