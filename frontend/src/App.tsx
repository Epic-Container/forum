import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/Auth';
import Signup from './pages/signup';
import PostModal from './pages/postModal';
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
        <Route path="/Home" element={<Home token={ token }/>} />
        <Route path="/" element={<Auth setToken={tokenHandle}/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Post" element={<PostModal token={token}/>}/>
      </Routes>
    </Router>
  );
};

export default App;
