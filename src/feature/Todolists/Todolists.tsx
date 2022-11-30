import {Todolist} from './Todolist/Todolist';
import s from './Style/Todolists.module.css'
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {getTodolists} from './TodolistsReducer';



export const Todolists = () =>{
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(state=> state.todolists)
  useEffect(()=>{
    dispatch(getTodolists())
  },[])
  return <div className={s.todolists}>
    {
      todolists.map( (td,i) => {
        return <div key={i} >
          <Todolist todolist={td}/>
      </div>})
    }
  </div>
}