import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import LOGO from "../assets/logo.png"
import {config} from "./Constants"
var url = config.url.API_URL

const SendEmail = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        stringEmail: "",
      });

    const PostData = async (event) => {
        event.preventDefault();
        const { email, stringEmail } = user;
        const res = await fetch(`${url}/send-email`, {
          method: "POST",
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            stringEmail:stringEmail
          }),
        });
    
        const data = res.json();
    
        if (res.status === 422 ||res.status === 400 || !data) {
          window.alert("Request Failed");
          console.log("Request Failed");
        } else {
          window.alert("Request successfull - OTP sent");
          console.log("Request successfull - OTP sent");
          navigate("/change-password");
        }
      };

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
    
  return (
    <div className='flex flex-col justify-center items-center bg-[#112D4E] h-screen bg-string'>
      <div className='max-w-[700px] w-full'>
        <div className='flex gap-2 justify-center items-center my-4'>

          <div className='flex flex-col gap-1 justify-start items-start'>
            <p className='text-3xl text-white'>Generate Verification Code</p>
          <p className='text-white'>Enter your String ID and Email ID  below - to recieve a verification code for PASSWORD CHANGE </p>
          </div>
        
        <img src={LOGO} width={150} alt="" />
        </div>
        
      
      <div className='bg-[#DBE2EF] bg-opacity-30 rounded-lg pt-12 pb-6'>
        <div className="w-full flex justify-center pr-6 items-center">
            <input
            name="stringEmail"
            value={user.stringEmail}
            onChange={handleChange}
            type="text"
            className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
            placeholder="Enter String ID (username@string.com) "
          />
          </div>
          <div className="w-full flex justify-center pr-6 items-center">
            <input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="text"
            className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
            placeholder="Enter email ID"
          />
          </div>
          <button
              onClick={PostData}
              className="p-2 m-2 bg-[#101c2a] rounded-md text-white hover:bg-[#113868] duration-200"
            >
              Send Mail
            </button>
        </div>

      </div>
      
        

        
        
    </div>
  )
}

export default SendEmail