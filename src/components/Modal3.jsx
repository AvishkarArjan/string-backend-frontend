import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';
import imageCompression from "browser-image-compression";
import {AiFillCloseCircle} from "react-icons/ai"
import {config} from "./Constants"
var url = config.url.API_URL


const Modal3 = (props) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [value,setValue] = useState(props.data)
  value.completedAt =""
  const [editors,setEditors] = useState(props.editorss);

  useEffect(() => {
    // console.log(value);
  }, [])
  
  

  const updateProject = async (event) =>{
    event.preventDefault();
    const {_id ,title,editor,completedAt,language,channel,description,thumbnail,remarks,projectStatus } = value;
  

    const res = await fetch(`${url}/admin/allprojects`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id:_id,title:title,editor:editor,completedAt:completedAt,language:language,channel:channel,description:description,thumbnail:thumbnail,remarks:remarks,projectStatus:projectStatus,requestType:"update"
        }),
      });
    const data = await res.json();
    // console.log(data);

    if (data.status === 422 || !data) {
        window.alert("Invalid update");
        console.log("Invalid Registration");
      }
      else if(res.status ==400){
        // console.log(data)
        window.alert("Title already exists!")
      } else {
        window.alert("Update successfull");
        console.log("Update Successfull");
        window.location.reload(false)
      }
  }

  let name, val;
  const handleUpdate = (event) => {
    // console.log(event.target);
    name = event.target.name;
    val = event.target.value;

    setValue({
      ...value,
      [name]: val,
    });
  };

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
      setValue({ ...value, thumbnail: base64 });
      // console.log(file);
      // console.log(base64);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus =()=>{
    if(value.projectStatus=="pending"){
      setValue({...value,projectStatus:"completed"})
      console.log(value);
    }else{
      
      setValue({...value,projectStatus:"pending",completedAt:(new Date().toISOString())})
      // setValue({...value,completedAt:new Date().toISOString()})
      console.log(value);
    }

  }

  return (
    <div className="flex justify-center items-center flex-col">
      <button className="bg-[#8FD9A8] hover:bg-[#6bc489] text-black rounded-full px-2 w-32" onClick={toggleModal}>Update Project</button>
      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-black bg-opacity-70 h-[100vh] w-full flex justify-center items-center">
            <div className=" relative p-5 w-full  max-w-[700px] bg-[#fff] rounded-lg  mx-8">
              <div className="content">
                <div className="flex justify-between items-start">
                  <h2 className="italic text-2xl border-b-[6px] w-fit border-[#3F72AF]">
                    Update Project Details
                  </h2>
                  <div className="flex gap-2">
                    <button className="rounded-full text-white bg-[#679b79] hover:bg-[#527c61] duration-200 shadow-lg shadow-[#adadad] px-2" onClick={updateProject}>Update</button>
                    {/* <a href={"/admin/allprojects/" + props.logId}>
                      <button className="bg-[#a0a0ff] rounded-full">
                        View Log
                      </button>
                    </a> */}
                    <button
                      onClick={toggleModal}
                      className=" rounded-full border- shadow-lg shadow-[#adadad]"
                    >
                      <AiFillCloseCircle color="red"  size={30}/>
                    </button>
                  </div>
                </div>

                <div className="flex gap-1 w-full justify-between my-2 mb-4">
                  <div className="flex gap-2">
                  <p className="font-normal ">Project Status : </p>
                  <p className="text-white shadow-lg rounded-full px-2 bg-[#112D4E]">{value.projectStatus.toUpperCase()}</p>
                  </div>
                  {value.projectStatus == "pending"?(
                    <button onClick={toggleStatus} className="text-white duration-200 bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-lg shadow-[#c8c6c6]">Mark Project Complete </button>
                  ):null}
                  
                </div>
                
                <div className="m-2 h-96 overflow-hidden overflow-y-scroll">
                  <div className="w-full flex justify-start items-center">
                    Title:
                    <input
                      name="title"
                      value={value.title}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div className="w-full flex justify-start items-center">
                    Editor:
                    <input
                      name="editor"
                      value={value.editor}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Name"
                    />
                  </div>
                  
                  {/* <div className="w-full flex justify-start items-center">
                    Completed At:
                    <input
                      name="completedAt"
                      value={value.completedAt}
                      onChange={(event)=>{setValue({
                        ...value,
                        completedAt:event.target.value,
                      });
                    console.log(value);}}
                      type="date"
                      className="m-2 w-full p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      
                    />
                  </div> */}
                  <div className="w-full flex justify-start items-center">
                   Language:
                    <input
                      name="language"
                      value={value.language}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div className="w-full flex justify-start items-center">
                    Channel:
                    <input
                      name="channel"
                      value={value.channel}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Name"
                    />
                  </div>
                
                  <div className="w-full flex justify-center pr-6 items-center">
                    Thumbnail : 
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
                  
                  <div className="w-full flex justify-start items-center">
                  Remarks:
                    <input
                      name="remarks"
                      value={value.remarks}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Name"
                    />
                  </div>
                  {/* <ul className=" flex flex-col justify-start items-start cursor-default">
                      <li className=" cursor-default"><b>Title :</b>  {props.title}</li>
                      <li className=" cursor-default"><b>Editor :</b>  {props.editor} </li>
                      <li className=" cursor-default"><b>Created at :</b>  {props.createdAt}</li>
                      <li className=" cursor-default"><b>Completed at :</b>  {props.completedAt} </li>
                      <li className=" cursor-default"><b>Language :</b> {props.language}</li>
                      <li className=" cursor-default"><b>Channel Name :</b> {props.channel} </li>
                      <li className=" cursor-default"><b>Content Writer:</b> {props.contentw} </li>
                      <li className=" cursor-default"><b>Shooting:</b> {props.shooting} </li>
                      <li className=" cursor-default"><b>Presenting:</b> {props.presenting} </li>
                      <li className=" cursor-default"><b>Editing:</b> {props.editing} </li>
                      <li className=" cursor-default"><b>Digital Marketing:</b> {props.digm} </li>
                      <li className=" cursor-default"><b>Remarks:</b> {props.remarks} </li>
                    </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal3;

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
