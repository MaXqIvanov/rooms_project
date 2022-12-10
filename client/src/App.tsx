import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { MainPage } from './pages/MainPage';
import { RoomsPage } from './pages/RoomsPage';

function App() {
  const [current_time, setCurrentTime] = useState<number>(0)
  const refTimer:any = useRef(null)
  useEffect(() => {
    axios.get('http://localhost:8002/api/rooms/6394d1acea1c8836ac91f1d7').then((response)=>{
      console.log(response)
      setCurrentTime(response.data.time)
      refTimer.current = setInterval(()=> {
        setCurrentTime((prev: number) => prev !== 120 ? prev + 1 : 0)
      }, 1000)
    })
    return () => clearInterval(refTimer.current);
  },[])

  return (
    <div>
      <Routes>
        <Route
          path={'/'}
          element={<MainPage />}
        />
        <Route
          path={'/:id'}
          element={<RoomsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
