import React, { useState,useEffect } from "react";
import Modal2 from "./Modal2";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Modal3 from "./Modal3";
import Modal4 from "./Modal4";
import {config} from "./Constants"
var url = config.url.API_URL

const AllProjects = () => {
  const [projectData, setProjectData] = useState();
  const history = useNavigate();


  const callProjectsPage = async () => {
    try {
      const res = await fetch(`${url}/admin/allprojects`, {
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
      // history("/login");
    }
  };
  useEffect(() => {
    callProjectsPage();
  }, []);
  

  return (
    <div className="bg-string bg-[#F9F7F7] h-[200vh] w-full pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {projectData
        ? projectData.slice(0).reverse().map((project) => (
            <div className="bg-[#3F72AF] rounded-md m-8 p-3 flex flex-col justify-between items-start shadow-lg shadow-[#2b2941] hover:bg-[#2e5482] duration-300">
              <div className="flex justify-between items-start w-fit">
                <h1 className="text-2xl text-white">{project.title}</h1>
              </div>
             
              <img src={project.thumbnail} className="w-full rounded-sm shadow-lg shadow-[#2b2941]" alt="" />
              <div className="grid grid-cols-1 gap-1 w-full justify-center items-center mt-2">
              <div className="lg:flex justify-between items-start">
                <Modal4 data = {project} />
                <Modal2 title={project.title} editor={project.editor} createdAt={project.createdAt} completedAt={project.updatedAt} language={project.language} channel={project.channel} projectStatus={project.projectStatus} description={project.description} remarks={project.remarks} />
                
                </div>
                <div className="w-full flex justify-end">
                {project.projectStatus=="pending"?(
                  <Modal3 data={project}  />
                ):null}
                </div>
              
                
                
                
              </div>
            </div>
          ))
        : null}
      </div>
      
    </div>
  );
};

export default AllProjects;
