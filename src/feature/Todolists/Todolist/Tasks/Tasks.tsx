import {Task} from './Task/Task';
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks';
import {useEffect} from 'react';
import {addTasks, changeTitleTask, getTasks} from './TasksReducer';
import {AddItemForm} from '../../../../components/AddItemForm';

type TasksPropsType = {
  todolistId: string
}
export const Tasks = (props: TasksPropsType) => {
  const tasks = useAppSelector(state => state.tasks[props.todolistId])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasks(props.todolistId))
  }, [])

  const changeTitle = (id: string, title: string) => {
    dispatch(changeTitleTask({todolistId: props.todolistId, taskId: id, newTask: {title}}))
  }

  const addTask = (title: string) => {
    dispatch(addTasks({todolistId: props.todolistId, title}))
  }

  const task = tasks.length ?
    tasks.map((t, i) =>
      <Task key={i} task={t} callback={changeTitle}/>)
    : <span>{'Нет в списке задач'}</span>
  return <div>
    <AddItemForm addItem={addTask}/>
    {
      task
    }
  </div>
}