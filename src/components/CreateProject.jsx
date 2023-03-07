import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { CiImageOn } from "react-icons/ci";
import { config } from "./Constants";
var url = config.url.API_URL;

const CreateProject = () => {
  const [img, setImg] = useState({ thumbnail: "" });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      const base64 = await convertToBase64(compressedFile);
      setImg({ ...img, thumbnail: base64 });
      // console.log(file);
      // console.log(base64);
    } catch (error) {
      // console.log(error);
    }
  };

  // GET request for list of Editors

  const [createProjectData, setCreateProjectData] = useState();

  const callCreateProjectPage = async () => {
    try {
      const res = await fetch(`${url}/admin/createproject`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setCreateProjectData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      // console.log(error);
      // history("/login");
    }
  };

  useEffect(() => {
    callCreateProjectPage();
  }, []);

  let navigate = useNavigate();

  // Setting up Post request for project creation
  const [project, setProject] = useState({
    title: "",
    editor: "",
    completedAt: "",
    language: "",
    channel: "",
    thumbnail: "",
    description: "",
    remarks: "",
  });

  let name, value;
  const handleProject = (event) => {
    // console.log(event.target);
    name = event.target.name;
    value = event.target.value;

    setProject({
      ...project,
      [name]: value,
    });
  };

  const PostData = async (event) => {
    event.preventDefault();
    // console.log(project);
    const {
      title,
      editor,
      completedAt,
      language,
      channel,
      description,
      remarks,
    } = project;
    if(editor =="Editor*"){
      window.alert("Please select Editor !")
    }else{
      const res = await fetch(`${url}/admin/createproject`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          editor: editor,
          completedAt: completedAt,
          language: language,
          channel: channel,
          thumbnail: img.thumbnail,
          description: description,
          remarks: remarks,
        }),
      });
  
      const data = await res.json();
      console.log(data);
  
      if (res.status === 422 || !data) {
        window.alert("One or more fields missing");
        // console.log("Invalid Project Creation");
      } else {
        window.alert("Project creation successfull");
        // console.log("Project creation successfull");
        navigate("/admin/projects");
      }
    }
    
  };

  return (
    <div className="bg-string pt-20 bg-[#F9F7F7] h-screen w-full justify-center items-center grid md:grid-cols-2 gap-8 px-4">
      <div className="m-2 p-2 h-full flex justify-center items-start">
        <NavLink to="/admin/projects">
          <button className="w-full  m-2 p-1 shadow-lg shadow-[#00000065] rounded-full bg-[#112D4E] text-white hover:bg-[#214f83]">
            Go back to projects page
          </button>
        </NavLink>
      </div>

      <div className="m-10 h-[450px] rounded-lg my-auto bg-[#3F72AF] shadow-lg shadow-[#040c16] py-2 flex flex-col justify-end items-center ">
        <div className="w-full h-fit overflow-hidden overflow-y-scroll">
          <form
            method="POST"
            className="flex flex-col w-full justify-center items-center"
          >
            <p className="text-3xl italic pb-2 text-white">
              Enter Project Details
            </p>

            <div className="w-full flex justify-center pr-6 items-center">
              {/* <AiOutlineUser size={25} /> */}
              <input
                name="title"
                value={project.title}
                onChange={handleProject}
                type="text"
                className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
                placeholder="Project Title*"
              />
            </div>
            <div className="w-full flex justify-center pr-6 items-center">
              {/* <HiOutlineMail size={25} /> */}
              <input
                name="language"
                value={project.language}
                onChange={handleProject}
                type="text"
                className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
                placeholder="Language*"
              />
            </div>
            <div className="w-full flex justify-center pr-6 items-center">
              {/* <AiOutlinePhone size={25} /> */}
              <input
                name="channel"
                value={project.channel}
                onChange={handleProject}
                type="text"
                className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
                placeholder="Channel*"
              />
            </div>
            <div className="w-full flex justify-center pr-6 items-center">
              <select
                name="editor"
                value={project.editor}
                onChange={handleProject}
                className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
              >
                <option>Editor*</option>
                {createProjectData
                  ? createProjectData.map((emp) =>
                      emp.accType == "employee" ? (
                        <option>{emp.name}</option>
                      ) : null
                    )
                  : null}
              </select>
            </div>

            <div className="w-full flex flex-col justify-start pr-6 items-center">
              {/* <AiOutlineKey size={25} /> */}
              <p className=" flex justify-center items-center gap-2 italic text-white">
                <CiImageOn size={20} /> Project Thumbnail
              </p>
              <input
                name="thumbnail"
                lable="image"
                type="file"
                onChange={(e) => {
                  handleFileUpload(e);
                }}
                className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
                accept=".jpeg, .png, .jpg"
              />
            </div>

            <div className="w-full flex justify-center pr-6 items-center">
              {/* <AiOutlineKey size={25} /> */}
              <input
                name="description"
                value={project.description}
                onChange={handleProject}
                className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
                placeholder="Project Description (optional)"
              />
            </div>

            <div className="w-full flex justify-center pr-6 items-center">
              {/* <AiOutlineKey size={25} /> */}
              <input
                name="remarks"
                value={project.remarks}
                onChange={handleProject}
                className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
                placeholder="Remarks (optional)"
              />
            </div>

            <div className="flex w-[80%] justify-between items-center">
              <button
                onClick={PostData}
                className="p-2 my-2 shadow-lg shadow-[#00000065] rounded-full bg-[#112D4E] text-white hover:bg-[#214f83]"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
