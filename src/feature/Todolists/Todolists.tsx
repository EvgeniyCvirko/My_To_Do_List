import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import s from './Style/Todolists.module.css'
import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {createTodolist, getTodolists} from './TodolistsReducer';
import {AddItemForm} from '../../components/AddItemForm';


export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(state => state.todolists)
  const isLogin = useAppSelector(state => state.login.isLogin)
  const addTodolist = useCallback((title: string) => {
    dispatch(createTodolist(title))
  }, [])

  const todolistRender = todolists.map((td) => {
      return <div key={td.id}>
        <div>
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