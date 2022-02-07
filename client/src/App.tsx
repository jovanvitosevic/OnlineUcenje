import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { User } from './tipovi';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <BrowserRouter>

      {
        user === undefined ? (
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        ) : (
          <Routes>

          </Routes>
        )
      }

    </BrowserRouter>
  );
}

export default App;
