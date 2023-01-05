import './App.css';
import { GamePage } from './pages/Game.page';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Home.page';
import socket from './utils/socket';

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
