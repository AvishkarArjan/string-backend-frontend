import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import dayjs from "dayjs";
import {config} from "./Constants"
var url = config.url.API_URL

const Projects = () => {
  const [projectData, setProjectData] = useState();
  const history = useNavigate();
  const callProjectsPage = async () => {
    try {
      const res = await fetch(`${url}/admin/projects`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setProjectData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      history("/login");
    }
  };

  useEffect(() => {
    callProjectsPage();
  }, []);
  return (
    <div className="bg-string pt-20 h-screen w-full  bg-[#F9F7F7]">
      <div className="grid grid-cols-1 lg:grid-cols-2 px-14">
      <div className="flex flex-col mb-4 px-20 lg:justify-start lg:items-start justify-center items-center">
        <p className="text-xl italic">
        Actions
        </p>
        
        <NavLink to="/admin/createproject">
          <h1 className="bg-[#3F72AF] px-2 rounded-full text-white hover:bg-[#538bce] shadow-lg my-1 shadow-[#a6a6a6]">
            Create new project
          </h1>
        </NavLink>
        <NavLink to="/admin/allprojects">
        <h1 className="bg-[#3F72AF] px-2 rounded-full text-white hover:bg-[#4c87ce] shadow-lg mb-1 shadow-[#a6a6a6]">View all project details</h1>
        </NavLink>
      </div>
      
      <div className="flex justify-center items-center flex-col ">
        <h1 className="text-xl hover:bg-[#dfdfdf] rounded-md px-2">All projects</h1>
        <div className="All-Project flex flex-col mx-10 justify-center items-center ">
          {/* mapping ProjectData */}
          <div className="overflow-y-scroll h-[400px]">
          {projectData
            ? projectData.slice(0).reverse().map((project) => (
                <div className="my-2 p-2 flex bg-[#39659b] rounded-lg text-white w-[600px] gap-7 justify-between items-center shadow-lg shadow-[#adadad]">
                  <div className="flex flex-col justify-start items-start">
                  <h1 className="text-xl">{project.title}</h1>
                  <p className="font-light">Created on: {dayjs(project.createdAt).format("DD/MM/YYYY")}</p>
                  </div>
                  
                  <div className="flex flex-col justify-end items-end ">
                  <p className="shadow-lg rounded-full px-2 bg-[#112D4E] mb-1">Project Status : {project.projectStatus.toUpperCase()} </p>
                  <Modal logId="1" title={project.title} editor={project.editor} createdAt={project.createdAt} completedAt={project.updatedAt} language={project.language} channel={project.channel} description={project.description} thumbnail={project.thumbnail} projectStatus={project.projectStatus} remarks={project.remarks} />


                  </div>
                  
                </div>
              ))
            : null}
          </div>
          
        </div>
      </div>
      </div>
      
      
    </div>
  );
};

export default Projects;
