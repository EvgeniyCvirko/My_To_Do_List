import React, {useEffect} from 'react';
import {Todolists} from '../feature/Todolists/Todolists';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../feature/Auth/Login';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {setIsInitialized} from './AppReducer';
import {setLogout} from '../feature/Auth/LoginReducer';

export const App = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const isLogin = useAppSelector(state => state.login.isLogin)
  const dispatch = useAppDispatch()
  useEffect(() =>{
      dispatch(setIsInitialized())
  }, [isLogin])

  if ( !isInitialized) {
  }

  const logoutHandler = () => {
dispatch(setLogout())
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
