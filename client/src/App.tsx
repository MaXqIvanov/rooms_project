import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { MainPage } from './pages/MainPage';
import { RoomsPage } from './pages/RoomsPage';

function App() {

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
