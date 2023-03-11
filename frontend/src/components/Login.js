import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const baseURL = "http://localhost:3000/user/login/";

function Login() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem("key")

    console.log(token);
    if (!token) {
        navigate('/login')
    } else {
        navigate('/socket')
    }
  
  }, [navigate])

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post(baseURL, {
        email:email
      })
      .then((response) => {
        sessionStorage.setItem("key", response.data.token);
        sessionStorage.setItem("user", response.data.user.name);
        navigate('/socket')
        window.location.reload()
      });
    
  }

  return (
      <div className="bg-gradient-to-r flex justify-center items-center from-pink-500 to-blue-500 h-screen">
        <div className="bg-white flex justify-center  w-3/6 h-4/6 gap-4 place-content-center">
          <div className="grid grid-cols-1 flex justify-center w-3/6 gap-4 place-content-center">
            <form className="flex flex-col" onSubmit={handleLogin} >
              <label className="mx-auto text-4xl">LOGIN</label>
              <input
                className="bg-slate-200 h-10 my-20 p-5 rounded"
                value={email}
                placeholder="username"
                onChange={(event) => setEmail(event.target.value)}
              />
              <button className="bg-pink-500 h-10 rounded text-white" type="submit">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>

  );
}

export default Login;
