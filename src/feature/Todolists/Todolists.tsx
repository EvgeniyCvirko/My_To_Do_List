import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import s from './Style/Todolists.module.css'
import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {
  changeOrderTodolist,
  changeOrderTodolists,
  changeTodolistTitle,
  createTodolist,
  getTodolists
} from './TodolistsReducer';
import {AddItemForm, AddItemFormSubmitHelperType} from '../../components/AddItemForm';
import {TodolistServerType} from '../../types/CommonTypes';


export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(state => state.todolists)
  const isLogin = useAppSelector(state => state.login.isLogin)

  //const [newTodolists, setNewTodolists] = useState<TodolistServerType[]>(useAppSelector(state => state.todolists))
  const [currentTodolist, setCurrentTodolist] = useState<TodolistServerType>(todolists[0])
  const addTodolist = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
    const resultAction = await dispatch(createTodolist(title))
    if (createTodolist.rejected.match(resultAction)) {
      if (resultAction.payload?.errors?.length) {
        const errorMessage = resultAction.payload.errors
        helper.setError(errorMessage)
      } else {
        helper.setError('some error occurred')
      }
    } else {
      helper.setValue('')
    }
  }, [])
  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, todolist: TodolistServerType) => {
    setCurrentTodolist(todolist)
  }
  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = '#00897b'

  }
  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.style.backgroundColor = 'lightgray'
  }
  const onDropHandler = (event: React.DragEvent<HTMLDivElement>, todolist: TodolistServerType) => {
    event.preventDefault()
    dispatch(changeOrderTodolists({
      todolists: todolists.map(t => {
        if (t.order === todolist.order) {
          return {...t, order: currentTodolist.order}
        }
        if (t.order === currentTodolist.order) {
          return {...t, order: todolist.order}
        }
        return t
      })
    }))
    /*if (todolist.id === currentTodolist?.id) {
      //dispatch(changeTodolistTitle({todolistId:todolist.id, title:todolist.title , order: currentTodolist.order}))
      //dispatch(changeOrderTodolist({todolistId:todolist.id,order:currentTodolist.order}))
      return
      }
      */
    event.currentTarget.style.backgroundColor = '#00897b'
  }
  console.log(todolists)
  const todolistRender = [...todolists].sort((a:TodolistServerType,b:TodolistServerType) => a.order - b.order).map((td) => {
      return <div key={td.id}>
        <div onDragStart={(e) => dragStartHandler(e, td)}
             onDragLeave={(e) => dragEndHandler(e)}
             onDragEnd={(e) => dragEndHandler(e)}
             onDragOver={(e) => dragOverHandler(e)}
             onDrop={(e) => onDropHandler(e, td)}
             draggable={true}>
          <Todolist todolist={td}/>
        </div>
      </div>
    }
  )
  useEffect(() => {
    if (!isLogin) {
      return
    }
    dispatch(getTodolists())
  }, [])

  if (!isLogin) {
    return <Navigate to={'/login'}/>
  }

  return (<div className={s.todolists}>
      <div className={s.addForm}>
        <AddItemForm addItem={addTodolist}/>
      </div>
      <div className={s.todolistRender}>
        {todolistRender}
      </div>
    </div>

  )
}