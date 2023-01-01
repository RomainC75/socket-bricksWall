import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GamePage } from './pages/Game.page';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Home.page';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/game" element={<GamePage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
