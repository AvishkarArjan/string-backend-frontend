import React, { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import LIVE from "../assets/live.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RCAdmin from "./Admin_Cuts/RCAdmin";
import MRCAdmin from "./Admin_Cuts/MRCAdmin";
import FCAdmin from "./Admin_Cuts/FCAdmin";
import SCAdmin from "./Admin_Cuts/SCAdmin";
import LCAdmin from "./Admin_Cuts/LCAdmin";
import BackFolAdmin from "./Admin_Cuts/BackFolAdmin";
import dayjs from "dayjs";
import {config} from "./Constants"
var url = config.url.API_URL

const Home = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState();
  const [projects, setProjects] = useState();

  const callProjectsPage = async () => {
    try {
      await axios.get(`${url}/admin`,{withCredentials: true})
      .then((response)=>{
        setWorks(response.data.works);
      setProjects(response.data.projects);
      })
      .catch((err)=>{
        console.log(err)
      })
      
      

      
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    callProjectsPage();
    console.log(process.env)
  }, []);

  const [tog, setTog] = useState({ _id: "", tf: false });
  const toggleWork = (_id) => {
    if (_id == tog._id || tog._id == "") {
      setTog({ _id: _id, tf: !tog.tf });
    } else {
      setTog({ tf: !tog.tf, _id: _id });
    }
  };

  const [tog2, setTog2] = useState({ _id: "", tf2: false });
  const toggleWork2 = (_id) => {
    if (_id == tog2._id || tog2._id == "") {
      setTog2({ _id: _id, tf2: !tog2.tf2 });
    } else {
      setTog2({ tf2: !tog2.tf2, _id: _id });
    }
  };

  const [adminRevStatus, setAdminRevStatus] = useState({
    _id: "",
    revStatus: "",
    title: "",
  });

  const adminRevYes = async (id, titl) => {
    setAdminRevStatus({ _id: id, revStatus: "yes", title: titl });
    // console.log(adminRevStatus);
  };
  const adminRevNo = async (id, titl) => {
    setAdminRevStatus({ _id: id, revStatus: "no", title: titl });
    // console.log(adminRevStatus);
  };

  return (
    <div className="bg-string pt-20 bg-[#F9F7F7] h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-start m-10  ">
        <div className="flex flex-col justify-center items-center ">
          <div className="flex gap-2 justify-center items-center">
            <p className="text-2xl">New Work</p>
            <img src={LIVE} className="w-14" alt="" />
          </div>
          <div className="shadow-lg bg-[#d7dfee] rounded-lg bg-opacity-50 shadow-[#8d939e] p-2">
            {works
              ? works
                  .slice(0)
                  .reverse()
                  .map((work) =>
                    (work.roughCut == true && work.roughCutAdmin == false) ||
                    (work.multiCamRoughCut && !work.multiCamRoughCutAdmin) ||
                    (work.firstCut && !work.firstCutAdmin) ||
                    (work.secondCut && !work.secondCutAdmin) ||
                    (work.lastCut && !work.lastCutAdmin) ||
                    (work.backup && !work.backupAdmin) ? (
                      <div className="flex flex-col bg-[#3F72AF] text-white rounded-lg w-[500px] p-2 my-1 shadow-lg shadow-[#919191]">
                        <div className=" flex justify-between items-end">
                          <div className="flex flex-col justify-start items-start">
                            <div className="text-xl">{work.title}</div>
                            <div className="flex justify-center items-center gap-1">
                              <CiUser size={16} />
                              <p className="font-light">{work.editor}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="shadow-lg rounded-full px-2 bg-[#112D4E]">
                              *Work in Progress
                            </div>
                            <button
                              onClick={() => toggleWork(work._id)}
                              className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-md duration-300"
                            >
                              Review Work
                            </button>
                          </div>
                        </div>

                        {tog.tf && tog._id == work._id && (
                          <div className="flex justify-between items-start bg-[#043c81] mt-2 p-2 rounded-md h-full">
                            <div className="flex flex-col justify-between h-full items-start">
                              <div className="flex flex-col justify-start items-start">
                                <p className="text-xl w-full flex justify-start items-start">
                                  Project: {work.title}
                                </p>
                                <p className="font-light">
                                  Editor: {work.editor}{" "}
                                </p>
                              </div>
                              <div className="my-4 flex flex-col justify-start items-start">
                                <i>Uploaded Image</i>
                                <img
                                  src={work.image}
                                  className="w-48 rounded-md"
                                  alt=""
                                />
                              </div>

                              <div className="my-4 flex flex-col justify-start items-start">
                                <p>
                                  Reviewed Script :{" "}
                                  <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                    {work.revScript ? "Yes" : "No"}{" "}
                                  </div>
                                </p>
                                <p>
                                  Computer Name:{" "}
                                  <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                    {work.compName}
                                  </div>
                                </p>
                                <p>
                                  Folder Path:
                                  <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                    {work.folderPath}
                                  </div>{" "}
                                </p>
                                <p className="flex flex-col justify-start items-start">
                                  Backup Folder :{" "}
                                  {work.backupFolder ? (
                                    <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                      {work.backupFolder}
                                    </div>
                                  ) : (
                                    <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                      To be updated
                                    </div>
                                  )}{" "}
                                </p>
                              </div>

                              {/* <p className="flex gap-1 ">
                            Work Status:
                            <p className="bg-[#6497d6] rounded-full text-sm flex justify-center items-center shadow-lg px-1">
                              {work.workStatus.toUpperCase()}
                            </p>
                          </p> */}
                            </div>
                            {/* img , submit section */}
                            <div className="h-full w-fit flex flex-col justify-start items-start">
                              <div className="h-full flex flex-col gap-2 justify-start items-start">
                                <div className="flex gap-2">
                                  <p>Rough Cut</p>
                                  {work.roughCut ? (
                                    !work.roughCutAdmin ? (
                                      <div>
                                        <RCAdmin
                                          data={work}
                                          projects={projects}
                                        />{" "}
                                      </div>
                                    ) : (
                                      <div className="w-fit flex bg-[#33b96f] px-2 rounded-lg">
                                        Completed
                                      </div>
                                    )
                                  ) : (
                                    <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                      In progress
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <p>Multi Cam Rough Cut</p>
                                  {work.roughCutAdmin ? (
                                    work.multiCamRoughCut ? (
                                      !work.multiCamRoughCutAdmin ? (
                                        <div>
                                          <MRCAdmin
                                            data={work}
                                            projects={projects}
                                          />{" "}
                                        </div>
                                      ) : (
                                        <div className="w-fit flex bg-[#33b96f] px-2 rounded-lg">
                                          Completed
                                        </div>
                                      )
                                    ) : (
                                      <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                        In progress
                                      </div>
                                    )
                                  ) : (
                                    <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                      In progress
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <p>First Cut</p>
                                  {work.multiCamRoughCutAdmin ? (
                                    work.firstCut ? (
                                      !work.firstCutAdmin ? (
                                        <div>
                                          <FCAdmin
                                            data={work}
                                            projects={projects}
                                          />{" "}
                                        </div>
                                      ) : (
                                        <div className="w-fit flex bg-[#33b96f] px-2 rounded-lg">
                                          Completed
                                        </div>
                                      )
                                    ) : (
                                      <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                        In progress
                                      </div>
                                    )
                                  ) : (
                                    <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                      In progress
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <p>Second Cut</p>
                                  {work.firstCutAdmin ? (
                                    work.secondCut ? (
                                      !work.secondCutAdmin ? (
                                        <div>
                                          <SCAdmin
                                            data={work}
                                            projects={projects}
                                          />{" "}
                                        </div>
                                      ) : (
                                        <div className="w-fit flex bg-[#33b96f] px-2 rounded-lg">
                                          Completed
                                        </div>
                                      )
                                    ) : (
                                      <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                        In progress
                                      </div>
                                    )
                                  ) : (
                                    <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                      In progress
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <p>Last Cut</p>
                                  {work.secondCutAdmin ? (
                                    work.lastCut ? (
                                      !work.lastCutAdmin ? (
                                        <div>
                                          <LCAdmin
                                            data={work}
                                            projects={projects}
                                          />{" "}
                                        </div>
                                      ) : (
                                        <div className="w-fit flex bg-[#33b96f] px-2 rounded-lg">
                                          Completed
                                        </div>
                                      )
                                    ) : (
                                      <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                        In progress
                                      </div>
                                    )
                                  ) : (
                                    <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                      In progress
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <p>Backup Folder</p>
                                  {work.lastCutAdmin ? (
                                    work.backup ? (
                                      work.backupAdmin == false ? (
                                        <div>
                                          <BackFolAdmin
                                            data={work}
                                            projects={projects}
                                          />{" "}
                                        </div>
                                      ) : (
                                        <div className="w-fit flex bg-[#33b96f] px-2 rounded-lg">
                                          Completed
                                        </div>
                                      )
                                    ) : (
                                      <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                        In progress
                                      </div>
                                    )
                                  ) : (
                                    <div className="w-fit flex bg-[#195cae] px-2 rounded-lg">
                                      In progress
                                    </div>
                                  )}
                                </div>
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
        <div className="flex flex-col justify-center items-center ">
          <p>Previously Reviewed Work</p>
          <div className="shadow-lg bg-[#DBE2EF] rounded-lg bg-opacity-50 shadow-[#8d939e] p-2 overflow-y-scroll h-[400px]">
            {works
              ? works
                  .slice(0)
                  .reverse()
                  .map((work) =>
                    work.roughCut ? (
                      <div className="flex flex-col p-2 rounded-md  my-1 w-[450px] bg-[#DBE2EF] shadow-lg shadow-[#aaaaaa]">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="">{work.title}</div>
                            <div className="flex justify-start items-center gap-1">
                              <CiUser size={16} />
                              <p className="font-light text-sm">
                                {work.editor}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <p>
                              Review{" "}
                              {work.adminRev == "yes" ? "Accepted" : null}
                            </p>
                            <button
                              onClick={() => toggleWork2(work._id)}
                              className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-lg text-white"
                            >
                              View Work
                            </button>
                          </div>
                        </div>

                        <div>
                          {tog2.tf2 && tog2._id == work._id && (
                            <div className="flex flex-col justify-between items-center bg-[#ffffff] mt-2 p-2 px-6 rounded-md w-full">
                              <div className="flex">
                              <div className="flex flex-col justify-start items-start w-full">
                                <p className="text-xl truncate">
                                  {work.title}{" "}
                                </p>
                                <p className="font-light">
                                  Editor: {work.editor}{" "}
                                </p>
                                <p className="font-light">
                                  Assigned on:{" "}
                                  {dayjs(work.createdAt).format("DD/MM/YYYY")}{" "}
                                </p>
                                <br />
                                <div className="flex flex-col justify-start items-start">
                                  Computer Name: <div className="bg-[#e1e1e1] rounded-lg px-2">{work.compName}</div> 
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                  Folder Path: <div className="bg-[#e1e1e1] rounded-lg px-2">{work.folderPath}{" "}</div> 
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                  Backup Folder: <div className="bg-[#e1e1e1] rounded-lg px-2">{work.backupFolder}{" "}</div> 
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                  Reviewed Script :{" "}
                                  {work.revScript ? "Yes" : "No"}{" "}
                                </div>
                                <p>
                                  Completed on:{" "}
                                  {dayjs(work.updatedAt).format("DD/MM/YYYY")}{" "}
                                </p>
                                <p className="flex gap-1 ">
                                  Work Status:
                                  <p className="bg-[#6497d6] rounded-full text-sm flex justify-center items-center shadow-lg px-1 text-white">
                                    {work.workStatus.toUpperCase()}
                                  </p>
                                </p>
                                
                              </div>
                              
                              {/* img , submit section */}
                              <div className="flex flex-col gap-10 justify-between items-start">
                                <div className="flex flex-col justify-start items-start">
                                  <i>Uploaded Image</i>
                                  <img
                                    src={work.image}
                                    className="w-48 rounded-md"
                                    alt=""
                                  />
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                  <i>backup screenshot</i>
                                  <img
                                    src={work.backupImage}
                                    className="w-48 rounded-md"
                                    alt=""
                                  />
                                </div>
                              </div>
                              </div>
                              <div className="mt-4 w-full">
                    <p className="w-full flex justify-start text-xl italic underline">Admin Remarks</p>
                    <div className="overflow-y-scroll h-[200px] mt-2 w-full border-2">
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
                            
                          )}
                        </div>
                      </div>
                    ) : null
                  )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
