import {Task} from './Task/Task';
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks';
import React, {useCallback, useEffect} from 'react';
import {addTasks, getTasks} from './TasksReducer';
import {AddItemForm, AddItemFormSubmitHelperType} from '../../../../components/AddItemForm';
import s from './../../Style/Todolists.module.css'
import {FilterType, TaskStatues} from '../../../../types/CommonTypes';

type TasksPropsType = {
  todolistId: string
  filter: FilterType
}
export const Tasks = React.memo((props: TasksPropsType) => {
  const tasks = useAppSelector(state => state.tasks[props.todolistId])
  const todolist = useAppSelector(state => state.todolists)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTasks(props.todolistId))
  }, [])

  const addTask = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
    const resultAction = await dispatch(addTasks({todolistId: props.todolistId, title}))
      if(addTasks.rejected.match(resultAction)) {
        if(resultAction.payload?.errors){
          helper.setError(resultAction.payload.errors)
        } else {
          helper.setError('some error occurred')
        }
      } else {
        helper.setValue('')
      }

  },[])
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
})