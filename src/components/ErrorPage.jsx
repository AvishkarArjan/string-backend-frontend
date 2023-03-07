import React, { useState,useEffect } from 'react'
import {MdErrorOutline} from "react-icons/md"
import { NavLink, useLocation } from "react-router-dom";
import {config} from "./Constants"
var url = config.url.API_URL

const ErrorPage = () => {

  const location = useLocation();
  const [err,setErr] = useState();
  useEffect(() => {
    if(location.pathname.includes("/employee/")){
      setErr("/employee");
    }else{
      setErr("/admin");
    }

    // console.log(location);
    
  }, [location])
  
  return (
    <div className='flex flex-col justify-center items-center bg-[#112D4E] h-screen bg-string'>
      <div className='bg-[#DBE2EF] bg-opacity-30 rounded-lg pt-12 pb-6 flex flex-col justify-center items-center'>
      <MdErrorOutline color='white' size={90}/>
        <h1 className='text-4xl text-white'>Error #404</h1>
        <p className='text-[#d0d0d0]'>Sorry the page does'nt exist</p>
        <div className='flex justify-between'>
        <NavLink to="/admin">
            <button className='bg-[#112D4E] text-white duration-200 hover:bg-[#5a82b0] rounded-full p-2 px-3 m-2'>Go Admin Home</button>
        </NavLink>
        <NavLink to="/employee">
            <button className='bg-[#112D4E] text-white duration-200 hover:bg-[#7398c2] rounded-full p-2 px-3 m-2'>Go Employee Home</button>
        </NavLink>
        </div>
        
      </div>
        
        
    </div>
  )
}

export default ErrorPage