import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import {config} from "./Constants"
var url = config.url.API_URL

const Leaves = () => {

    const [leaveData, setLeaveData] = useState();

  const callCalendarPage = async () => {
    try {
      const res = await fetch(`${url}/admin/leaves`, {
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
      // history("/login");
    }
  };

  useEffect(() => {
    callCalendarPage();
  }, []);

  const [approval, setApproval] = useState({
    _id: "",
    appr: "",
  });

  const approveYes = (_id) => {
    setApproval({ _id: _id, appr: "yes" });
  };
  const approveNo = (_id) => {
    setApproval({ _id: _id, appr: "no" });
  };

  const submitApproval = async (event) => {
    event.preventDefault();

    const { _id, appr } = approval;

    const res = await fetch(`${url}/admin/leaves`, {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        approval: appr,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      window.alert("Failed to submit approval");
      console.log("Failed to submit approval");
    } else {
      window.alert("Approval Submitted");
      console.log("Approval Submitted");
      window.location.reload(false);
    }
  };

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
    <div className='pt-20'>
    <div className="m-10 grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-start items-center">
        <p className="text-xl">New Applications</p>
        
        <div className=""></div>
        {leaveData
          ? leaveData
              .slice(0)
              .reverse()
              .map((leave) =>
                leave.approval == "pending" ? (
                  <div className="flex flex-col bg-[#3F72AF] text-white rounded-lg w-[500px] p-2 my-1 shadow-lg shadow-[#919191]">
                    <div className=" flex justify-between items-end">
                      <div className="flex flex-col justify-start items-start">
                        <div className="text-xl">By : {leave.name}</div>
                        <div className="flex justify-center items-center gap-1">
                          
                          <p className="font-light">
                            Applied on: {dayjs(leave.createdAt).format("DD/MM/YYYY") }
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div className="shadow-lg rounded-full px-2 bg-[#112D4E]">
                          Status :{" "}
                          {leave.approval == "pending" ? "PENDING" : null}
                        </div>
                        <button
                          onClick={() => toggleWork(leave._id)}
                          className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-md duration-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    {/* ******************************************* */}
                    {tog.tf && tog._id == leave._id && (
                      <div className="flex justify-between items-end bg-[#043c81] mt-2 p-2 rounded-md">
                        <div className="flex flex-col justify-start items-start">
                          <p className="text-xl">Leave Application</p>
                          <p className="font-light">
                            Applicant Name :{leave.name}{" "}
                          </p>
                          <br />
                          <p>{leave.name}</p>
                          <p>
                            From :
                            {dayjs(leave.startDate).format("DD/MM/YYYY")}
                          </p>
                          <p>
                            To :{dayjs(leave.endDate).format("DD/MM/YYYY")}
                          </p>
                          <p>Reason</p>
                          <p className="italic">{leave.reason} </p>
                        </div>
                        {/* img , submit section */}
                        <div className="flex flex-col  justify-between items-start">
                          <div className="flex flex-col justify-start items-start">
                          
                          
                        </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              Approve Leave
                              <button
                                onClick={() => approveYes(leave._id)}
                                className={
                                  approval.appr == "yes"
                                    ? "bg-[#12f612] shadow-lg border-white border-[1px] rounded-sm px-1"
                                    : "hover:bg-[#12f612] shadow-lg border-white border-[1px] rounded-sm px-1"
                                }
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => approveNo(leave._id)}
                                className={
                                  approval.appr == "no"
                                    ? "bg-[#f83939] shadow-lg border-white border-[1px] rounded-sm px-1"
                                    : "hover:bg-[#f83939] shadow-lg border-white border-[1px] rounded-sm px-1"
                                }
                              >
                                No
                              </button>
                            </div>

                            <button
                              className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-md"
                              onClick={(event) => {
                                submitApproval(event);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* ******************************************** */}
                  </div>
                ) : (
                  null
                )
              )
          : null}
      </div>

      <div className="flex flex-col justify-center items-center">
        <p>Previous Leave Requests</p>
        <div className="overflow-y-scroll h-[450px]">
        {leaveData
          ? leaveData.slice(0).reverse().map((leave) =>
              leave.approval == "yes" || leave.approval == "no" ? (
                <div className="flex flex-col p-2 rounded-md  my-1 w-[450px] bg-[#DBE2EF] shadow-lg shadow-[#aaaaaa]">
                  <div className="flex justify-between items-start">
                  <div className="flex flex-col justify-start items-start">
                    <div className="">By:{leave.name}</div>
                    <div className="flex justify-start items-center gap-1">
                      <p className="font-light text-sm">Applied on: {dayjs(leave.createdAt).format("DD/MM/YYYY")}</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1">
                      <p>Approval Status :</p>
                    <p className="shadow-lg rounded-full px-2 bg-[#112D4E] text-white">{leave.approval == "yes" ? "Accepted" : "Rejected"}</p>

                    </div>
                    <button
                        onClick={() => toggleWork(leave._id)}
                        className="bg-[#4c87ce] mt-1 px-2 rounded-full hover:bg-[#6497d6] shadow-lg text-white"
                      >
                        View Details
                      </button>
                  </div>
                  </div>

                  {tog.tf && tog._id == leave._id && (
                    <div className="flex justify-between items-center bg-[#fff] mt-2 p-2 rounded-md">
                      <div className="flex flex-col justify-start items-start">
                        <p className="text-xl">Leave Request </p>
                        <div className="flex gap-1">
                        <p className="font-light">Status : </p>
                        <p className="shadow-lg rounded-full px-2 bg-[#112D4E] text-white">
                        {leave.approval == "yes" ? "Accepted" : "Rejected"}</p>
                        </div>
                        
                        <br />
                        <p>Applicant Name: {leave.name}</p>
                        <p>Leave Start : {dayjs(leave.startDate).format("DD/MM/YYYY") } </p>
                        <p>Leave End : {dayjs(leave.endDate).format("DD/MM/YYYY")} </p>
                        <p>Reason</p>
                        <p className="italic">- {leave.reason} </p>
                      </div>
                      {/* img , submit section */}
                      <div className="flex flex-col gap-10 justify-between items-start">
                        <div className="flex flex-col justify-start items-start">
                          
                        </div>

                        <div className="flex flex-col gap-2">
                          
                        </div>
                      </div>
                    </div>
                  )}
                  
                  
                </div>
              ) : null
            )
          : null}
        </div>
        
      </div>
    </div></div>
  )
}

export default Leaves