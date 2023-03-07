import dayjs from "dayjs";
import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {config} from "./Constants"
var url = config.url.API_URL

const LeavesEmp = () => {
    const navigate = useNavigate();

  const [leaveData, setLeaveData]= useState();

  const callLeaveData= async()=>{
    try {
      const res = await fetch(`${url}/employee/leaves`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setLeaveData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }

  useEffect(() => {
    callLeaveData();

  }, [])
  
  
  const [leave, setLeave] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    approval: "pending",
  });

  const [toggle, setToggle] = useState(true);
  const toggleModal = () => {
    setToggle(!toggle);
  };

  const submitLeave = async(event)=>{
    event.preventDefault();
    const {startDate,endDate,reason,approval}= leave;

    const res = await fetch(`${url}/employee/leaves`,{
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,endDate,reason,approval
      }),
    })

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      window.alert("Leave Application Failed");
      console.log("Leave Application Failed");
    } else {
      window.alert("Leave Application Submitted");
      console.log("Leave Application Submitted");
      window.location.reload(false);
    }
  }

  const [tog, setTog] = useState({ _id: "", tf: false });
  const toggleWork = (_id) => {
    if (_id == tog._id || tog._id == "") {
      setTog({ _id: _id, tf: !tog.tf });
    } else {
      setTog({ tf:!tog.tf, _id: _id });
    }
    // console.log(tog);
  };

  return (
    <div className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
    <div>
      <button
        onClick={() => toggleModal()}
        className="bg-[#112D4E] px-2 rounded-full shadow-lg hover:bg-[#1a497e] duration-200 text-white text-lg"
      >
        Apply for Leave
      </button>

      <div className="flex flex-col justify-center items-center my-2">
      {toggle && (
        <div className="flex text-white bg-[#3F72AF] p-2 rounded-lg flex-col justify-center items-start shadow-lg shadow-[#2d445e]">
          <div className="w-full flex justify-between items-start my-1">
            <p>Leave Start :</p>
            <input
            onChange={(event) => {
              setLeave({ ...leave, startDate: event.target.value });
            }}
            name="startDate"
            type="date"
            className="bg-[#DBE2EF] px-2 rounded-full text-black shadow-lg"
          />
          </div>
          <div className="w-full flex justify-between items-start my-1">
            <p>Leave End :</p>
            <input
            onChange={(event) => {
              setLeave({ ...leave, endDate: event.target.value });
            }}
            name="endDate"
            type="date"
            className="bg-[#DBE2EF] px-2 rounded-full text-black shadow-lg"
          />
          </div>
          <div className="flex flex-col justify-start items-start">
            <p>Reason</p>
          <textarea
            onChange={(event) => {
              setLeave({ ...leave, reason: event.target.value });
            }}
            name="reason"
            className="bg-[#DBE2EF] rounded-lg my-2 p-2 outline-none text-black"
            placeholder="Reason for leave"
            cols="30"
            rows="10"
          ></textarea>
          </div>
          <div className="flex justify-end items-end w-full">
          <button onClick={(event)=>{submitLeave(event)}} className="bg-[#112D4E] px-2 rounded-full shadow-lg hover:bg-[#1a497e] duration-200">
            Submit Application
          </button>
          </div>
          
        </div>
      )}
      </div>

      
    </div>

    <div className="flex flex-col h-full justify-start items-center">
      <p className="text-xl italic">Previous Leave Requests</p>
      <div className="overflow-y-scroll h-[400px]">
      {leaveData?leaveData.slice(0).reverse().map((leave)=>(
            <div className="flex flex-col p-2 rounded-md  my-1 w-[450px] bg-[#DBE2EF] shadow-lg shadow-[#aaaaaa]">

              <div className="flex justify-between items-center">
                  <div className="flex flex-col justify-start items-start">
                    <div className="">Leave Request</div>
                    <div className="flex justify-start items-center gap-1">
                      <p className="font-light text-sm">Requested on : {dayjs(leave.createdAt).format("DD/MM/YYYY")}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="bg-[#112D4E] px-2 rounded-full shadow-lg text-white text-sm mb-1">{leave.approval == "yes" ? "Accepted" : leave.approval=="pending"?"Pending": "Rejected"}</p>
                    <button
                        onClick={() => toggleWork(leave._id)}
                        className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-lg text-white text-sm"
                      >
                        View Details
                      </button>
                  </div>
                  </div>

                  {tog.tf && tog._id == leave._id && (
                    <div className="flex flex-col justify-start items-start ml-2 my-2">
                    <p>Requested on : {dayjs(leave.createdAt).format("DD/MM/YYYY")}</p>
                    <p>Leave Start : {dayjs(leave.startDate).format("DD/MM/YYYY")}</p>
                    <p>Leave End : {dayjs(leave.endDate).format("DD/MM/YYYY")}</p>
                    <p>Reason for Leave</p>
                    <p className="italic"> - {leave.reason} </p>
                    </div>
                  )}
            
            
          </div>
          )) 
          :null}
      </div>
          

          
    </div>
    </div></div>
  )
}

export default LeavesEmp