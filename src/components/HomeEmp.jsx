import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Modal5 from "./Modal5";
import { NavLink, useNavigate } from "react-router-dom";
import Modal2 from "./Modal2";
import LIVE from "../assets/live.png";
import axios from "axios";
import RCmodal from "./Cut_Details/RCmodal";
import MRCmodal from "./Cut_Details/MRCmodal";
import FCmodal from "./Cut_Details/FCmodal";
import SCmodal from "./Cut_Details/SCmodal";
import FinCmodal from "./Cut_Details/FinCmodal";
import BackFolmodal from "./Cut_Details/BackFolmodal";
import {config} from "./Constants"
var url = config.url.API_URL

const HomeEmp = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState();
  const [workData, setWorkData] = useState();

  const callProjectsPage = async () => {
    try {
      await axios
        .get(`${url}/employee`,{withCredentials: true})
        .then((response) => {
          if (response.data.projectArr.length != 0) {
            setProjectData(response.data.projectArr);
          }

          if (response.data.workArr.length != 0) {
            setWorkData(response.data.workArr);
          }
          // console.log(response.data.workArr);
          // console.log(response.data.projectArr);

          if (!response.status === 200) {
            const error = new Error(response.error);
            throw error;
          }
        })
        .catch((err) => {
          console.log(err);

          navigate("/login");
        });
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callProjectsPage();
  }, []);

  let myArr = [];
  if (workData) {
    for (let i = 0; i < workData.length; i++) {
      myArr.push(workData[i].title);
    }
  }

  return (
    <div className="bg-string pt-20 h-screen bg-[#F9F7F7] flex justify-center items-center">
      <div className="w-[90%]  h-[95%] flex justify-between">
        <div className="flex flex-col justify-start items-center  lg:items-start">
          <div className="flex gap-2 justify-center items-center">
            <p className="text-xl">New Work</p>
            <img src={LIVE} className="w-12" alt="" />
          </div>

          <div className="w-[100%] h-fit p-4 bg-[#DBE2EF] rounded-lg bg-opacity-50 grid grid-cols-1 lg:grid-cols-2 shadow-lg shadow-[#8d939e]">
            {projectData
              ? projectData.map((project) =>
                  project.workStatus == "pending" ? (
                    <div className="bg-[#3F72AF] shadow-lg shadow-[#7f7f7f] w-full rounded-lg h-fit p-2 m-2 flex flex-col justify-start items-start text-white">
                      <h1 className="text-xl pb-2">{project.title}</h1>
                      <div className="w-full flex justify-center items-center">
                        <img
                          src={project.thumbnail}
                          className="w-40 rounded-lg mb-2"
                          alt=""
                        />
                      </div>

                      <p className="font-light">
                        Assigned on:{" "}
                        {dayjs(project.workDate).format("DD/MM/YYYY")}
                      </p>

                      <p>My role: EDITOR</p>
                      <p>Status : {project.workStatus.toUpperCase()} </p>

                      {workData ? (
                        myArr.includes(project.title) ? (
                          workData.map((work) =>
                            work.title == project.title ? (
                              work.roughCut == false ? (
                                <div>
                                  <RCmodal data={work} project={project} />
                                </div>
                              ) : work.roughCutAdmin &&
                                work.multiCamRoughCut == false ? (
                                <div>
                                  {" "}
                                  <MRCmodal data={work} project={project} />{" "}
                                </div>
                              ) : work.multiCamRoughCutAdmin &&
                                work.firstCut == false ? (
                                <div>
                                  <FCmodal data={work} project={project} />{" "}
                                </div>
                              ) : work.firstCutAdmin &&
                                work.secondCut == false ? (
                                <div>
                                  <SCmodal data={work} project={project} />{" "}
                                </div>
                              ) : work.secondCutAdmin &&
                                work.lastCut == false ? (
                                <div>
                                  <FinCmodal data={work} project={project} />{" "}
                                </div>
                              ) : work.lastCutAdmin && work.backup == false ? (
                                <div>
                                  <BackFolmodal data={work} project={project} />
                                </div>
                              ) : (
                                <div className="shadow-lg rounded-full px-4 bg-[#112D4E] ">
                                  under review
                                </div>
                              )
                            ) : null
                          )
                        ) : (
                          <div className="mt-1 flex justify-between items-end w-full">
                            <Modal2
                              title={project.title}
                              editor={project.editor}
                              createdAt={project.createdAt}
                              completedAt={project.completedAt}
                              language={project.language}
                              channel={project.channel}
                              projectStatus={project.projectStatus}
                              description={project.description}
                              remarks={project.remarks}
                            />
                            <Modal5
                              title={project.title}
                              editor={project.editor}
                            />
                          </div>
                        )
                      ) : project.workStatus == "pending" ? (
                        <div>
                          <div className="mt-1 flex justify-between items-end w-full">
                            <Modal2
                              title={project.title}
                              editor={project.editor}
                              createdAt={project.createdAt}
                              completedAt={project.completedAt}
                              language={project.language}
                              channel={project.channel}
                              projectStatus={project.projectStatus}
                              description={project.description}
                              remarks={project.remarks}
                            />
                            <Modal5
                              title={project.title}
                              editor={project.editor}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>no work</div>
                      )}
                    </div>
                  ) : null
                )
              : null}
          </div>
        </div>

        <div className="w-[40%] h-full  flex flex-col justify-start items-center">
          <p className="text-xl">Recent work</p>

          <NavLink to="/employee/completedprojects">
            <p className="bg-[#112D4E] text-white rounded-full px-2">
              Checkout my previous work
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomeEmp;
