import React, {useEffect} from 'react';
import {Todolists} from '../feature/Todolists/Todolists';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../feature/Auth/Login';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {setIsInitialized} from './AppReducer';
import {setLogout} from '../feature/Auth/LoginReducer';
import {Loading} from '../components/Common/Loading';
import {ErrorBar} from '../components/Common/ErrorBar';

export const App = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const isLogin = useAppSelector(state => state.login.isLogin)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setIsInitialized())
  }, [])

  if (!isInitialized) {
    return <Loading/>
  }

  const logoutHandler = () => {
    dispatch(setLogout())
  }

  return (
    <div className="App">
      <ErrorBar/>
      <header className="App-header">
        <div className="Todolist">TodoList</div>
        <div className="Logout" onClick={logoutHandler}>Logout</div>
      </header>
      {status === 'loading' && <Loading/>}
      <Routes>
        <Route path="/*" element={<Todolists/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}
