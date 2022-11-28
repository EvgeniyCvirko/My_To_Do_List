import React from 'react';
import { Todolists } from '../feature/Todolists/Todolists';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Todolists />
      </header>
    </div>
  );
}
