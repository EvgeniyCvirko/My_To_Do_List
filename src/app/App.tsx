import React from 'react';
import { Todolists } from '../feature/Todolists/Todolists';
import './App.css';

export const App = () => {

  const logoutHandler = () => {
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='Todolist'>TodoList</div>
        <div className='Logout' onClick={logoutHandler}>Logout</div>
      </header>
      <Todolists />
    </div>
  );
}
