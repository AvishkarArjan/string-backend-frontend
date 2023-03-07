import React, { useState } from "react";
import LOGO from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai"
import {HiOutlineMail} from "react-icons/hi"
import {AiOutlinePhone} from "react-icons/ai"
import {AiOutlineKey} from "react-icons/ai"
import {config} from "./Constants"
var url = config.url.API_URL


const Register = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState("password");
  const handleShow = () => {
    if (show === "password") {
      setShow("text");
    } else {
      setShow("password");
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleUser = (event) => {
    // console.log(event.target);
    name = event.target.name;
    value = event.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, phone, password, cpassword } = user;
    const res = await fetch(`${url}/register`, {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password,
        cpassword: cpassword,
      }),
    });

    const data = res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration successfull");
      console.log("Successfull Registration");
      navigate("/login");
    }
  };

  return (
    <div
      name="register"
      className="bg-[#F9F7F7] h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-string"
    >
      <div className="px-10 pl-20 mx-10 flex flex-col justify-center items-center">
        <img
          src={LOGO}
          width={300}
          className="duration-200 hover:scale-105"
          alt=""
        />
        <div className="bg-[#DBE2EF] bg-opacity-50 rounded-lg shadow-lg hover:scale-105 duration-200 my-2">
        <h1 className="text-7xl text-[#112D4E]">Register into</h1>
        <h1 className="italic text-8xl text-[#112D4E]">STRING</h1>
        <h1 className="text-2xl font-light text-[#112D4E]">the core of breathe.</h1>
        </div>
        
      </div>
      <div className="m-20 h-[500px] w-[80%] rounded-lg my-auto bg-[#3366a3] shadow-lg shadow-[#040c16] py-2 flex flex-col justify-center items-center ">
        <p className="text-2xl text-white">Create your String Account</p>
        <p className="font-light pb-2 text-white">Enter your details below</p>
        <form
          method="POST"
          className="flex flex-col w-full justify-center items-center"
        >
          <div className="w-full flex justify-center pr-6 items-center">
            <AiOutlineUser size={25} />
            <input
            name="name"
            value={user.name}
            onChange={handleUser}
            type="text"
            className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none "
            placeholder="Name"
          />
          </div>
          <div className="w-full flex justify-center pr-6 items-center">
            <HiOutlineMail size={25} />
            <input
            name="email"
            value={user.email}
            onChange={handleUser}
            type="text"
            className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
            placeholder="username@string.com"
          />
          </div>
          <div className="w-full flex justify-center pr-6 items-center">
            <AiOutlinePhone size={25} />
            <input
            name="phone"
            value={user.phone}
            onChange={handleUser}
            type="text"
            className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
            placeholder="Phone No"
          />
          </div>
          <div className="w-full flex justify-center pr-6 items-center">
            <AiOutlineKey size={25} />
            <input
            name="password"
            value={user.password}
            onChange={handleUser}
            type={show}
            className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
            placeholder="Enter new password"
          />
          </div>
          
          <div className="w-full flex justify-center pr-6 items-center">
            <AiOutlineKey size={25} />
            <input
            name="cpassword"
            value={user.cpassword}
            onChange={handleUser}
            type={show}
            className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
            placeholder="Re-enter Password"
          />
          </div>


          <div className="flex w-[80%] justify-between items-center">
            <NavLink to="/login" className="hover:bg-[#345d8e] px-2 rounded-full text-white duration-200">
              Already have an account ? Sign in.
            </NavLink>
            <button
              onClick={PostData}
              className="px-2 p-1 m-2 bg-[#112D4E] rounded-full text-white hover:bg-[#1d4a7d] duration-100"
            >
              Register
            </button>
          </div>
        </form>
        <div className="">
          <button className="hover:bg-[#345d8e] px-2 rounded-full text-white duration-200" onClick={handleShow}>
            Show Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
