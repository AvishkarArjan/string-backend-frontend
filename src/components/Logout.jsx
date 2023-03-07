import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {config} from "./Constants"
var url = config.url.API_URL

const Logout = () => {

    // promises
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(`${url}/logout`,{
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
        }).then((res)=>{
            navigate('/login',{replace:true});
            if(res.status != 200){
                const error =   new Error(res.error)
                throw error
            }
        }).catch((err)=>{
            console.log(err);
        })
    })

  return (
    <div>
        Logout page
    </div>
  )
}

export default Logout