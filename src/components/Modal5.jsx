import React, { useState, useEffect } from "react";
import THUMBNAIL from "../assets/thubmnail.png";
import Modal6 from "./Modal6";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import {AiFillCloseCircle} from "react-icons/ai"
import {config} from "./Constants"
var url = config.url.API_URL


const Modal5 = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const [work, setWork] = useState({
    editor:props.editor,
    title:props.title,
    compName:"",
    folderPath:"",
    backupFolder:"",
    image:"",
    revScript:false,
    completedCuts:false,
    remarks:""
  });

  let name, val;
  const handleProject = (event) => {
    // console.log(event.target);
    name = event.target.name;
    val = event.target.value;

    setWork({
      ...work,
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
      setWork({ ...work, image: base64 });
      // console.log(work);
      // console.log(base64);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCutYes =()=>{
    setWork({...work,
      completedCuts:!work.completedCuts,}
      )
      // console.log(work);
  }

  const toggleRevYes=()=>{
    setWork({
      ...work,
      revScript:!work.revScript
    })
    // console.log(work);
  }

  const PostData = async (event) => {
    event.preventDefault();
    const {title,editor,compName,folderPath,image,revScript,completedCuts,remarks} = work;
    console.log(work);
    if(revScript == false){
      window.alert("Please select REvSciprt = Yes")
    }
    try {
      if(revScript == true){
        const res = await fetch(`${url}/employee`
        , {
          method: "POST",
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            editor:editor,
            title: title,
            compName: compName,
            folderPath: folderPath,
            image:image,
            revScript:revScript,
            completedCuts:completedCuts,
            remarks: remarks,
            adminRev:"underRev",
            workCreated:true
          }),
        }
        );
    
        const data = await res.json();
        console.log(data);
    
        if (res.status === 422 || !data) {
          window.alert("Failed to Submit");
          console.log("Failed to Submit");
        } else {
          window.alert("Submitted Succesfully");
          console.log("Submitted Succesfully");
          window.location.reload(false);
        }
      }
    
    } catch (error) {
      console.log(error);
      if(error.status==413){
        window.alert("File size too large !")
        window.location.reload(false)
      }
    }
  };


  return (
    <div className="flex justify-center items-center flex-col">
      <button className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#3f70ac] text-white shadow-md duration-300" onClick={toggleModal}>
        Start Working
      </button>
      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-black h-[100vh] w-full flex justify-center items-center cursor-default text-black bg-opacity-70">
            <div className=" relative p-5 w-full max-w-[540px] bg-[#fff] rounded-md h-fit mx-8">
              <div className="content">
                <div className="flex justify-between ">
                  <h2 className="text-2xl">{props.title}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleModal}
                      className="rounded-full duration-300  "
                    >
                      <AiFillCloseCircle color="red"  size={30}/>
                    </button>
                  </div>
                </div>
                <div>
                  <img src={THUMBNAIL} className="my-2 w-44 rounded-md" alt="" />
                </div>

                <div className="flex justify-start gap-12 items-start m-2">
                  <p>Have you reviewed the Script ? </p>
                  <div className="flex gap-2">
                    <button onClick={toggleRevYes} className={work.revScript?"text-black border-[1px] border-black rounded-lg bg-green-500  px-2"
                    :"text-black border-[1px] rounded-lg border-black hover:bg-green-500 duration-200 px-2"}>
                      YES
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start m-2">
                  <div className="flex justify-start items-start p-1 gap-2">
                    <p>Add computer name : </p>
                    <input className="bg-[#DBE2EF] rounded-md" type="text" name="compName" onChange={handleProject} />
                  </div>
                  <div className="flex justify-start items-start p-1 gap-2">
                    <p>Add folder path : </p>
                    <input className="bg-[#DBE2EF] rounded-md" type="text" name="folderPath" onChange={handleProject} />
                  </div>
                  
                  <div className="flex justify-start items-start p-1 gap-2">
                    <p>Upload Screenshot : </p>
                    <input className="bg-[#DBE2EF] rounded-r-md" type="file" name="image" onChange={(e)=>{handleFileUpload(e)}} accept=".jpeg, .png, .jpg" />
                  </div>
                  <p>   
                    <i >(.jpg .jpeg .png , Max - 2MB)</i>
                  </p>
                  
                </div>
                
                <div className="flex justify-end items-end">
                  <button onClick={PostData} className="bg-[#112D4E] rounded-full text-white px-2">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal5;

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