import React, {useEffect} from 'react';
import {Todolists} from '../feature/Todolists/Todolists';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../feature/Auth/Login';
import {useAppDispatch} from '../utils/hooks';
import {setIsInitialized} from './AppReducer';

export const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
dispatch(setIsInitialized())
  }, [])
  const logoutHandler = () => {
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="Todolist">TodoList</div>
        <div className="Logout" onClick={logoutHandler}>Logout</div>
      </header>
      <Routes>
        <Route path="/*" element={<Todolists/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}
