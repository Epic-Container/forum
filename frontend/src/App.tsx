import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/Auth';
import Signup from './pages/signup';

// async function fetchData() {
//   const response = await fetch('http://localhost:3211');
//   const blogs = await response.json();
//   return blogs.getBlog.data
// }

const App: React.FC = () => {
  const [token, setToken] = useState('')
  function tokenHandle(a:string) {
    setToken(a)
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Auth" element={<Auth setToken={tokenHandle}/>} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
