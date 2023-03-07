import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import Axios from "axios";
import { CiUser } from "react-icons/ci";
import RegisterModal from "./RegisterModal";
import UpdateAcc from "./UpdateAcc";
import DelAcc from "./DelAcc";
import dayjs from "dayjs";
import axios from "axios";
import {config} from "./Constants"
var url = config.url.API_URL

const Employees = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await Axios.get(`${url}/admin/employees`,{withCredentials: true});
      // console.log("products>>>",data);
    };
    fetchData();
  }, []);

  const [showEmp, setShowEmp] = useState("hidden");
  const [detBut, setdetBut] = useState("Show Details");
  const EmpToggle = (event) => {
    event.preventDefault();
    if (showEmp == "hidden") {
      setShowEmp("");
      setdetBut("Hide Details");
    } else {
      setShowEmp("hidden");
      setdetBut("Show Details");
    }
  };
  const [userData, setUserData] = useState();

  const history = useNavigate();
  const callEmployeesPage = async () => {
    try {
      await axios.get(`${url}/admin/employees`,{withCredentials: true})
      .then((response)=>{
        setUserData(response.data);
      })
      .catch((err)=>{
        console.log(err)
      })
      // const res = await fetch("", {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      // });

      // const data = await res.json();
      // // console.log(data);
      

      // if (!res.status === 200) {
      //   const error = new Error(res.error);
      //   throw error;
      // }
    } catch (error) {
      // console.log(error);
      history("/login");
    }
  };

  useEffect(() => {
    callEmployeesPage();
  }, []);

  const [tog, setTog] = useState({ _id: "", tf: false });
  const toggleWork = (_id) => {
    if (_id == tog._id || tog._id == "") {
      setTog({ _id: _id, tf: !tog.tf });
    } else {
      setTog({ tf: !tog.tf, _id: _id });
    }
    // console.log(tog);
  };

  return (
    <div className="bg-string pt-28 md:flex p-10 justify-center items-start bg-[#F9F7F7] h-screen w-full gap-2 text-gray-300">
      {/* </div> */}
      <div className="w-full grid lg:grid-cols-2 grid-cols-1">
        <div className="text-black w-full flex flex-col justify-start items-center">
          <p className="text-2xl italic">Actions</p>

          <div className="flex flex-col py-2">
            <button className="my-1 ">
              <RegisterModal />
            </button>
          </div>
        </div>
        <div className=" w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-2xl pb-2 text-black italic">All Employees</h1>
          <div className=" overflow-hidden overflow-y-scroll bg-[#DBE2EF] rounded-lg bg-opacity-50 shadow-[#8d939e] py-5 px-7 h-[400px]">
            {userData
              ? userData
                  .slice(0)
                  .reverse()
                  .map((user) => (
                    <div className="flex flex-col justify-center items-center bg-[#3F72AF] text-white rounded-lg w-full p-2 my-1 shadow-lg shadow-[#919191]">
                      <div className="flex w-full">

                      {user.profile ? (
                        <div className="m-1 mr-3 ">
                          <img src={user.profile} className="w-14 rounded-full" alt="" />
                        </div>
                      ) : null}

                      <div className=" flex w-full justify-between items-end">
                        <div className="flex flex-col justify-start items-start">
                          <div className="text-xl">{user.name}</div>
                          <div className="flex justify-center items-center gap-1">
                            <CiUser size={16} />
                            <p className="font-light">
                              {" "}
                              {user.accType == "admin"
                                ? "Admin"
                                : "Editor"}{" "}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end items-end">
                          {user.accType=="employee"?<DelAcc data={user} />:null}
                          
                          <UpdateAcc data={user} />
                          <button
                            onClick={() => toggleWork(user._id)}
                            className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-md duration-300 w-32"
                          >
                            Show Details
                          </button>
                        </div>
                      </div>
                      </div>
                      

                      

                      {tog.tf && tog._id == user._id && (
                        <div className="flex justify-between items-center bg-[#043c81] mt-2 p-2 rounded-md w-full">
                          <div className="flex flex-col justify-start items-start">
                            <p className="text-xl">
                              Name: {user.name}{" "}
                            </p>
                            <p className="font-light">Role: Editor </p>
                            <br />
                            <p>String ID : {user.email}</p>
                            {user.email_acc?<p>Email ID : {user.email_acc}</p>:null}
                            <p>Phone : {user.phone} </p>
                            <p>Account Type : {user.accType.toUpperCase()} </p>
                            <p>
                              Joined at :{" "}
                              {dayjs(user.createdAt).format("DD/MM/YYYY")}
                            </p>
                          </div>
                          {/* img , submit section */}
                          <div className="flex flex-col gap-10 justify-between items-start">
                            <div className="flex flex-col gap-2"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
