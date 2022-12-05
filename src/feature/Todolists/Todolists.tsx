import {Todolist} from './Todolist/Todolist';
import s from './Style/Todolists.module.css'
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {createTodolist, getTodolists} from './TodolistsReducer';
import {AddItemForm} from '../../components/AddItemForm';


export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(state => state.todolists)
  useEffect(() => {
    dispatch(getTodolists())
  }, [])
 const addTodolist = useCallback((title: string) => {
    dispatch(createTodolist(title))
 }, [])

  const todolistRender = todolists.map((td) => {
      return <div key={td.id} className={s.todolists}>
        <div >
          <Todolist todolist={td}/>
        </div>
      </div>
    }
  )

  return ( <div>
      <AddItemForm addItem={addTodolist} />
    { todolistRender }
  </div>

  )
}