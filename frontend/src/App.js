// App.js
import React from 'react';
// import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Quiz from './components/Quiz/Quiz';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/quiz" element={<Quiz/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
