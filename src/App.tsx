import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import { initializeApp } from "firebase/app";
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';
import Results from './pages/Results';


initializeApp(config.firebaseConfig)

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          } />
          <Route path="/results" element={
            <AuthRoute>
              <Results />
            </AuthRoute>
          } />

        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
