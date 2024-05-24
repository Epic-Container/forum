import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/Auth';
import Signup from './pages/signup';

async function fetchData() {
  const response = await fetch('http://localhost:3211');
  const blogs = await response.json();
  return blogs.getBlog.data
}

const App: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
