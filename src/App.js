// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from "./Components/Home"
import Login from './Components/Login'
import Register from "./Components/Register"
import { createContext, useEffect, useState } from 'react';

let Userlogg = createContext();


function App() {
  const [loggedIn, setLoggedIn] = useState("");
  const [token, setToken] = useState("");
  // setToken(localStorage.getItem("token"))
  function setUserToken() {
    setToken(localStorage.getItem("token"))
   setLoggedIn(localStorage.getItem("userId"))
  }
  useEffect(() => {
    setUserToken();
  }, [])
  return (
    <>
      <Userlogg.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>

        <BrowserRouter >
        <div  className='sticky-top'>
          <Navbar />
          </div>

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />


          </Routes>

        </BrowserRouter>
      </Userlogg.Provider>

    </>
  );
}

export default App;
export { Userlogg }
