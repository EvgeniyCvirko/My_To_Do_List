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
  console.log(todolists)
  return <>
    {
      todolists.map( (td,i) => {console.log(td.title);

        <div key={i} className={s.todolists}>
          <Todolist todolist={td}/>
      </div>})
    }
  </>
}