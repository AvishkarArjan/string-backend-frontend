import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {config} from "./Constants"
var url = config.url.API_URL

const CompProjects = () => {
  const navigate= useNavigate();
  const [workData, setWorkData] = useState();

  const callWorksPage = async () => {
    try {
      const res = await fetch(`${url}/employee/completedprojects`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setWorkData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callWorksPage();
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
    <div className="bg-string bg-[#F9F7F7] h-screen w-full pt-20">
      <h1 className="text-xl italic">My Completed Projects</h1>

      <div className="flex flex-col justify-center items-center">
        <div className="overflow-y-scroll">
          {workData
            ? workData
                .slice(0)
                .reverse()
                .map((work) => (
                  <div className="flex flex-col bg-[#3F72AF] text-white rounded-lg w-[500px] p-2 my-1 shadow-lg shadow-[#919191]">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col justify-start items-start">
                        <div className="text-xl">{work.title}</div>
                        <div className="flex justify-center items-center gap-1">
                          <CiUser size={16} />
                          <p className="font-light">{work.editor}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleWork(work._id)}
                          className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-md duration-200"
                        >
                          Show Details
                        </button>
                      </div>
                    </div>

                    {tog.tf && tog._id == work._id && (
                      <div className="flex justify-between items-center bg-[#043c81] mt-2 p-2 rounded-md">
                        <div className="flex flex-col justify-start items-start w-full">
                          <p className="text-xl">Project : {work.title} </p>
                          <p className="font-light">Role: Editor </p>
                          <p className="font-light">
                            Submitted at :{" "}
                            {dayjs(work.updatedAt).format("DD/MM/YYYY")}{" "}
                          </p>
                          <br />
                          <div className="flex justify-between items-start w-full">
                            <div className="flex flex-col justify-start items-start text-sm">
                              

                              <p>Computer Name: {work.compName}</p>
                              <p>Folder Path : {work.folderPath} </p>
                              <p>Backup Folder Path : {work.backupFolder} </p>
                              

                              <div className="flex gap-1">
                                <p>Reviewed Script : </p>
                                <p className="text-white px-2 bg-[#112D4E] rounded-full">
                                  {work.revScript ? "Yes" : "No"}
                                </p>
                              </div>


                              <div className="flex gap-1 mt-1">
                                <p>Work Status : </p>
                                <p className="text-white px-2 bg-[#112D4E] rounded-full">
                                  {work.workStatus.toUpperCase()}
                                </p>
                              </div>

                              <div className="flex gap-5 mt-4">
                                <div className="flex flex-col justify-start items-start">
                                <i>Uploaded Image</i>
                              <img
                                src={work.image}
                                className="w-44 rounded-md"
                                alt=""
                              />
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                <i>Backup Screenshot</i>
                              <img
                                src={work.backupImage}
                                className="w-44 rounded-md"
                                alt=""
                              />
                                </div>
                              
                            </div>

                            </div>
                            
                          </div>
                          <div className="mt-4 w-full">
                    <p className="w-full flex justify-start text-xl italic underline">Admin Remarks</p>
                    <div className="overflow-y-scroll h-[200px] mt-2 w-full rounded-lg border-[1px]">
                      {work.adminRemarks
                        ? work.adminRemarks
                            .slice(0)
                            .reverse()
                            .map((remark) => (
                              <div className="p-2 w-full flex flex-col justify-start items-start border-b-2 ">
                                <p><b className="italic">Regarding : </b> {remark.regarding}</p>
                                <p><b className="italic">Date : </b>
                                  {dayjs(remark.createdOn).format("DD/MM/YYYY")}
                                </p>
                                <p><b className="italic">Remark : </b>{remark.remark}</p>
                                
                              </div>
                            ))
                        : null}
                    </div>
                  </div>
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
  );
};

export default CompProjects;
