import {Task} from './Task/Task';
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks';
import React, {useCallback, useEffect, useState} from 'react';
import {addTasks, changeOrderTask, getTasks} from './TasksReducer';
import {AddItemForm, AddItemFormSubmitHelperType} from '../../../../components/AddItemForm';
import s from './../../Style/Todolists.module.css'
import {FilterType, TaskStatues, TaskType} from '../../../../types/CommonTypes';

type TasksPropsType = {
  todolistId: string
  filter: FilterType
}
export const Tasks = React.memo((props: TasksPropsType) => {
  const tasks = useAppSelector(state => state.tasks[props.todolistId])
  const dispatch = useAppDispatch()
  const [currentTask, setCurrentTask] = useState<TaskType>(tasks[0])
  useEffect(() => {
    dispatch(getTasks(props.todolistId))
  }, [])

  const addTask = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
    const resultAction = await dispatch(addTasks({todolistId: props.todolistId, title}))
    if (addTasks.rejected.match(resultAction)) {
      if (resultAction.payload?.errors) {
        helper.setError(resultAction.payload.errors)
      } else {
        helper.setError('some error occurred')
      }
    } else {
      helper.setValue('')
    }

  }, [])

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, task: TaskType) => {
    setCurrentTask(task)
  }
  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = '#00897b'
  }
  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.style.backgroundColor = 'lightgray'
  }
  const onDropHandler = (event: React.DragEvent<HTMLDivElement>, task: TaskType) => {
    event.preventDefault()
    dispatch(changeOrderTask({todolistId: task.todoListId, taskId: currentTask.id, putAfterItemId: task.id}))
    event.currentTarget.style.backgroundColor = '#00897b'
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
      return <div onDragStart={(e) => dragStartHandler(e, t)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => onDropHandler(e, t)}
                  draggable={true}>
        <Task key={i}
              taskTitle={t.title}
              todolistId={t.todoListId}
              taskId={t.id}
              status={t.status}/>
      </div>
    })
    : <span>{'Нет в списке задач'}</span>

  return <div className={s.tasks}>
    <AddItemForm addItem={addTask}/>
    {
      task
    }
  </div>
})