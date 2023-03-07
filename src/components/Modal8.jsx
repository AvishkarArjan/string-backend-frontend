import React, { useState } from "react";
import FCmodal from "./Cut_Details/FCmodal";
import FinCmodal from "./Cut_Details/FinCmodal";
import MRCmodal from "./Cut_Details/MRCmodal";
import RCmodal from "./Cut_Details/RCmodal";
import SCmodal from "./Cut_Details/SCmodal";

const Modal8 = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [cuts, setCuts] = useState({
    roughCut: false,
    multiCamRoughCut: false,
    firstCut: false,
    secondCut: false,
    finalCut: false,
  });
  const handleCheckbox = (event)=>{
    setCuts({...cuts,[event.target.value]:event.target.checked})
    // console.log(cuts)
  }
  return (
    <div>
      <button
        className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#3f70ac] text-white shadow-md duration-300"
        onClick={toggleModal}
      >
        Update Cuts
      </button>

      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-black h-[100vh] w-full flex justify-center items-center cursor-default text-black bg-opacity-70">
            <div className=" relative p-5 grid grid-cols-1 lg:grid-cols-2 w-fit bg-[#fff] rounded-md h-fit mx-8">
              <div className="content w-fit">
                <div className="flex justify-between ">
                  <h2 className="text-2xl">Title</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleModal}
                      className="rounded-full duration-300  "
                    >
                      {/* <AiFillCloseCircle color="red"  size={30}/> */}X Close
                    </button>
                  </div>
                </div>
                <div>
                  <img
                    src="../assets/logo.png"
                    className="my-2 w-44 rounded-md"
                    alt=""
                  />
                </div>

                <div className="flex justify-start gap-12 items-start m-2">
                  
                </div>
                <div className="flex flex-col justify-start items-start m-2">
                <div className="flex flex-col justify-start items-start p-1 gap-2">
                    <p>Uploaded Screenshot : </p>
                    <img src="" alt="" />
                  </div>
                  <div className="flex flex-col justify-start items-start p-1 gap-2">
                    <p>Computer name : </p>
                    <input
                      className="bg-[#DBE2EF] rounded-md"
                      type="text"
                      name="compName"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start p-1 gap-2">
                    <p>Folder path : </p>
                    <input
                      className="bg-[#DBE2EF] rounded-md"
                      type="text"
                      name="folderPath"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start p-1 gap-2">
                    <p>Backupt folder path : </p>
                    <input
                      className="bg-[#DBE2EF] rounded-md"
                      type="text"
                      name="backupFolder"
                    />
                  </div>
                  
                  <p>
                    <i>(.jpg .jpeg .png , Max - 2MB)</i>
                  </p>
                </div>
              </div>
              <div>
                Update Work
                <div className="flex flex-col justify-start items-start">
                  <i>
                    <b>Cut name</b>
                  </i>
                  <div className="flex justify-between w-full">
                    <p>Rough cut</p>
                    <div>
                      <button>
                        <RCmodal />
                      </button>
                      <input type="checkbox" value="roughCut" onChange={(e)=>handleCheckbox(e)} checked={cuts.roughCut} />
                    </div>
                  </div>
                  
                  
                </div>
                <div className="flex justify-end items-end">
                  <button className="bg-[#112D4E] hover:bg-[#215590] rounded-full text-white px-2">
                    UPDATE WORK
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

export default Modal8;
