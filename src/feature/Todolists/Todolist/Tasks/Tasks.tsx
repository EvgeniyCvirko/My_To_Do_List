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
    console.log('task =' + 'dragStartHandler')
    event.stopPropagation()
    setCurrentTask(task)
  }
  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('task =' + 'dragLeaveHandler')
    event.currentTarget.style.boxShadow = 'none'
    event.stopPropagation()
    //setCurrentTask(task)
  }
  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('task =' + 'dragEndHandler')
    event.currentTarget.style.boxShadow = 'none'
    event.stopPropagation()
  }
  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('task =' + 'dragOverHandler')
    event.stopPropagation()
    event.preventDefault()
    event.currentTarget.style.boxShadow = '0 10px 10px gray'
  }
  const onDropHandler = (event: React.DragEvent<HTMLDivElement>, task: TaskType) => {
    console.log('task =' + 'onDropHandler')
    event.stopPropagation()
    event.preventDefault()
    dispatch(changeOrderTask({todolistId: task.todoListId, taskId: currentTask.id, putAfterItemId: task.id}))
    event.currentTarget.style.boxShadow = 'none'
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
      return <div key={i}
                  onDragStart={(e) => dragStartHandler(e, t)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => onDropHandler(e, t)}
                  draggable={true}>
        <Task
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