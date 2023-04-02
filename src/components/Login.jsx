import React, { useState } from "react";
import LOGO from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import {BiUser} from "react-icons/bi"
import {FiKey} from "react-icons/fi"
import {config} from "./Constants"
var url = config.url.API_URL

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = async (event) => {
    event.preventDefault();
    const res = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    });
    const data = await res.json();
    // console.log(data);

    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
      console.log("Invalid Credentials");
    } else {
      window.alert("Login Successfull");
      console.log("Login Successfull");
      // console.log(data);
      if(data.accType === "admin"){
        navigate("/admin");
      }else{
        navigate("/employee");
      }
      
      // add special case for ADMIN LOGIN
    }
  };

  const [show, setShow] = useState("password");
  const handleShow = (event) => {
    event.preventDefault();
    if (show === "password") {
      setShow("text");
    } else {
      setShow("password");
    }
  };

  return (
    <div
      name="login"
      className="bg-white h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-string"
    >
      <div className="px-10 lg:pl-20 mx-10 flex flex-col justify-center items-center">
        <img
          src={LOGO}
          width={300}
          className="duration-200 hover:scale-105"
          alt=""
        />
       
        
      </div>
      <div className="w-full flex justify-center items-center">
      <div className="m-20 h-[500px] w-[80%] rounded-lg my-auto bg-[#3366a3] shadow-lg shadow-[#040c16] py-2 flex flex-col justify-center items-center mb-5">
        <p className="text-2xl text-white">Log in your String Account</p>
        <p className="font-light pb-2 text-white">Enter your details below</p>
        <form
          method="POST"
          className="w-[80%] flex flex-col justify-between items-center"
        >
          <div className="w-full flex justify-start items-center">
          <BiUser size={25}/>
          <input
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
            placeholder="Email"
          />
          </div>
          <div className="w-full flex justify-start items-center" >
            <FiKey size={25} />
            <input
            type={show}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
            placeholder="Password"
          />
          </div>
          

          <div className="flex w-full justify-between items-center">
            <NavLink to="/send-email" className="hover:bg-[#345d8e] px-2 rounded-full text-white duration-200">
              Forgot Password
            </NavLink>

            <button
              onClick={LoginUser}
              className="px-2 p-1 m-2 bg-[#112D4E] rounded-full text-white hover:bg-[#1d4a7d] duration-100 w-20"
            >
              Log in
            </button>
          </div>
          <div className="gap-2 mt-2 place-content-end w-full flex justify-end">
            
            
            <button className="hover:bg-[#345d8e]  px-2 rounded-full text-white duration-200 outline-none" onClick={handleShow}>Show Password</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
