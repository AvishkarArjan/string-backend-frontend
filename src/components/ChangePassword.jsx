import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../assets/logo.png"
import {config} from "./Constants"
var url = config.url.API_URL


const ChangePassword = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    otpCode: "",
    stringEmail: "",
    password: "",
    cpassword: "",
  });

  let name, val;
  const handleChange = (event) => {
    // console.log(event.target);
    name = event.target.name;
    val = event.target.value;

    setUser({
      ...user,
      [name]: val,
    });
  };

  const PostData = async (event) => {
    event.preventDefault();
    const { otpCode, stringEmail, password, cpassword } = user;
    const res = await fetch(`${url}/change-password`, {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otpCode: otpCode,
        stringEmail: stringEmail,
        password: password,
        cpassword: cpassword,
      }),
    });

    const data = res.json();

    if (
      res.status === 422 ||
      res.status === 400 ||
      res.status === 500 ||
      !data
    ) {
      window.alert("Failed to change Password");
      console.log("Failed to change Password");
    } else {
      window.alert("Password changed successfully");
      console.log("Password changed successfully");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#112D4E] h-screen bg-string">
      <div className="max-w-[700px] w-full">
        <div className="flex gap-2 justify-center items-center my-4">
          <div className="flex flex-col gap-1 justify-start items-start">
            <p className="text-3xl text-white">Change Password</p>
            <p className="text-white">
              Enter your <u>4 Digit Verification Code</u> and <u>New Password</u> below to change your password
            </p>
          </div>

          <img src={LOGO} width={150} alt="" />
        </div>
        <div className='bg-[#DBE2EF] bg-opacity-30 rounded-lg pt-12 pb-6'>
        <div className="w-full flex justify-center pr-6 items-center">
        <input
          name="otpCode"
          value={user.otpCode}
          onChange={handleChange}
          type="text"
          className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
          placeholder="Enter Verification Code"
        />
      </div>
      <div className="w-full flex justify-center pr-6 items-center">
        <input
          name="stringEmail"
          value={user.stringEmail}
          onChange={handleChange}
          type="text"
          className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
          placeholder="Enter string ID"
        />
      </div>
      <div className="w-full flex justify-center pr-6 items-center">
        <input
          name="password"
          value={user.password}
          onChange={handleChange}
          type="text"
          className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
          placeholder="Enter new password"
        />
      </div>
      <div className="w-full flex justify-center pr-6 items-center">
        <input
          name="cpassword"
          value={user.cpassword}
          onChange={handleChange}
          type="text"
          className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
          placeholder="Re-enter new password"
        />
      </div>
      <button className="p-2 m-2 bg-[#101c2a] rounded-full text-white hover:bg-[#113868] duration-200" onClick={PostData}>
        Change Password
      </button>
        </div>
      
      </div>
      
      
    </div>
  );
};

export default ChangePassword;
