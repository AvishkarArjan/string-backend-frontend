import React, { useState } from "react";
import {AiFillCloseCircle} from "react-icons/ai"
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

const Modal = (props) => {
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState("open");
  const toggleModal = () => {
    setModal(!modal);
    if (open === "open") {
      setOpen("close");
    } else {
      setOpen("open");
    }
  };


  return (
    <div className="flex justify-center items-center flex-col">
      <button className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-lg" onClick={toggleModal}>View Details</button>
      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay text-black bg-opacity-70 bg-black h-full w-full flex justify-center items-center">
            <div className=" relative p-5 w-full max-w-[540px] opacity-100 bg-[#fff] rounded-lg  h-fit mx-8">
              <div className="content">
                <div className="flex justify-between">
                  <h2 className="text-2xl">{props.title}</h2>
                  <div className="flex justify-center items-center gap-2">
                    <p className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#6497d6] shadow-md shadow-[#9a9a9a] text-white">
                      Status : {props.projectStatus.toUpperCase()}
                    </p>
                    <button
                      onClick={toggleModal}
                      className="rounded-full px-2 my-2"
                    >
                      <AiFillCloseCircle color="red"  size={30}/>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                <div className="flex flex-col justify-start items-start">
                <p className="text-xl">Project Description</p>
                <p>
                  <i>
                  {props.description}
                  </i>
                </p>
                </div>
                <div>
                  <img src={props.thumbnail} className="w-44 rounded-lg" />
                </div>
                </div>
                

                
                <br />
                <div className="my-2 w-fit">
                  <ul className="border-t-[6px] w-fit border-[#255893] flex flex-col justify-start items-start cursor-default">
                    <li className=" cursor-default">Title : {props.title}</li>
                    <li className=" cursor-default">Editor : {props.editor} </li>
                    <li className=" cursor-default">Created at : {dayjs(props.createdAt).format("DD/MM/YYYY") }</li>
                    <li className=" cursor-default">Completed at : {props.projectStatus=="completed"? dayjs(props.completedAt).format("DD/MM/YYYY"):null } </li>
                    <li className=" cursor-default">Language : {props.language}</li>
                    <li className=" cursor-default">Channel Name : {props.channel} </li>
                    <li className=" cursor-default">Remarks : {props.remarks} </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
