import React, { useState } from 'react'
import axios from "axios"
import dayjs from 'dayjs';
import { AiFillCloseCircle } from 'react-icons/ai';
import {config} from "../Constants"
var url = config.url.API_URL


const FinCmodal = (props) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
      setModal(!modal);
    };

    const handleLastCut=(event)=>{
      event.preventDefault()
      axios.post(`${url}/employee`,{
        title:props.data.title,
        lastCut:true
      },{withCredentials: true})
      .then((response)=>{
        console.log(response)
        if(response.status==200){
          window.location.reload(false)
        }
      })
      .catch((err)=>{
        console.log(err);
      })
  
    }


    return (
      <div>
        <button
          className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#3f70ac] text-white shadow-md duration-300"
          onClick={toggleModal}
        >
          Final Cut
        </button>
  
        {modal && (
          <div className="">
          <div className="fixed top-0 left-0 overlay bg-black h-[100vh] w-full flex justify-center items-center cursor-default text-black bg-opacity-70">
            <div className=" relative p-5 grid grid-cols-1 lg:grid-cols-2 w-fit bg-[#fff] rounded-md h-fit mx-8">
              <div className="content w-fit">
                <div className="flex justify-between ">
                  <h2 className="text-2xl">{props.data.title}</h2>
                  <div className="flex gap-2">
                    
                  </div>
                </div>
                <div>
                  <img
                    src={props.project.thumbnail}
                    className="my-2 w-44 rounded-md shadow-md shadow-[#6a6a6a]"
                    alt=""
                  />
                </div>

                
                <div className="flex flex-col justify-start items-start m-2">
                  <div className="flex flex-col justify-start items-start p-1 gap-2">
                    <p>Uploaded Screenshot : </p>
                    <img src={props.data.image} className="w-32" alt="" />
                  </div>
                  <div className="flex w-full justify-between items-start p-1 gap-2">
                    <div>
                      <p className="truncate">Computer name : </p>
                    </div>

                    <div className="bg-[#DBE2EF] rounded-md w-fit px-4">
                      {props.data.compName}
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-start p-1 gap-2">
                    <p className="truncate">Folder path : </p>
                    <div className="bg-[#DBE2EF] rounded-md w-fit px-4">
                      {props.data.folderPath}
                    </div>
                  </div>
                </div>
              </div>
              {/* grid col 2 */}
              <div className=" px-4 flex flex-col justify-between">
                
                <div className="flex flex-col justify-start items-start">
                  <div className="flex justify-between w-full">
                    <b className="text-2xl italic">Last cut Details</b>
                    <button
                      onClick={toggleModal}
                      className="rounded-full duration-300 "
                    >
                       <AiFillCloseCircle color="red"  size={30}/> 
                    </button>
                  </div>
                  <br />
                  <div className="flex flex-col justify-start items-start max-w-[400px] w-full">
                   
                   <p className="flex">
                     <b className="w-14 flex justify-start items-start">
                       Step-1
                     </b>
                     <p className="w-fit flex justify-start items-start">
                     Duplicate the sequence and change the name
                     </p>
                   </p>
                   <p className="flex">
                     <b className="w-14 flex justify-start items-start">
                       Step-2
                     </b>
                     <p className="w-fit flex justify-start items-start">
                     Implement the corrections
                     </p>
                   </p>
                   <p className="flex">
                     <b className="w-14 flex justify-start items-start">
                       Step-3
                     </b>
                     <p className="w-fit flex justify-start items-start">
                     Take output and send to review
                     </p>
                   </p>
                   
                 </div>
                 <div className="mt-4 w-full">
                    <p className="w-full flex justify-start text-xl italic underline">Admin Remarks</p>
                    <div className="overflow-y-scroll h-[200px] mt-2 w-full border-2">
                      {props.data.adminRemarks
                        ? props.data.adminRemarks
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
                <div className="flex justify-end items-end">
                  <button className="bg-[#112D4E] hover:bg-[#215590] rounded-full text-white px-2 mt-4" onClick={(e)=>handleLastCut(e)}>
                    Mark Last Cut Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    );
}

export default FinCmodal