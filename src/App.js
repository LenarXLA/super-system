import './App.css';

import { Home } from './Home';
import { Game } from './Game';
import { Navigation } from './Navigation';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className='m-3 d-flex justify-content-center'>
          REACT JS tutorial
        </h3>

        <Navigation />
        
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/game' element={<Game/>} />
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
