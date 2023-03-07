import dayjs from 'dayjs';
import React,{useState} from 'react'
import {AiFillCloseCircle} from "react-icons/ai"

const Modal2 = (props) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
      setModal(!modal);
      
    };
  
  
    return (
      <div className="flex justify-center items-center lg:justify-end lg:items-end ">
        <button className='hover:bg-[#5ca8ff] px-2 rounded-full duration-300 hover:text-white bg-[#112D4E] shadow-lg text-white' onClick={toggleModal}>View Details</button>
        {modal && (
          <div className="">
            <div className="fixed top-0 left-0 overlay bg-opacity-70 bg-black h-[100vh] w-full flex justify-center items-center text-black">
              <div className=" relative p-5 w-full  max-w-[700px] bg-[#fff] rounded-lg  mx-8">
                <div className="content">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl border-b-[6px] w-fit border-[#3F72AF]">{props.title}</h2>
                    <div className="flex gap-2">
                      <p className='hover:bg-[#253f5d] duration-200 flex justify-center items-center text-white shadow-lg rounded-full px-2 bg-[#112D4E]'>Project Status : {props.projectStatus.toUpperCase()} </p>
                      <button
                        onClick={toggleModal}
                        className="hover:bg-[#cbcbcb] rounded-full p"
                      >
                       <AiFillCloseCircle color="red"  size={30}/>

                      </button>
                    </div>
                  </div>
  
                  
                  <br />
                  <div className="p-2 w-full bg-[#DBE2EF] rounded-lg">
                    <ul className=" flex flex-col justify-start items-start cursor-default">
                      <li className=" cursor-default"><b>Project Title :</b>  {props.title}</li>
                      <li className=" cursor-default"><b>Description :</b>  {props.description}</li>
                      <li className=" cursor-default"><b>Editor :</b>  {props.editor} </li>
                      <li className=" cursor-default"><b>Created at :</b>  {dayjs(props.createdAt).format('DD/MM/YYYY')}</li>
                      <li className=" cursor-default"><b>Completed at :</b>  {props.projectStatus=="completed"?dayjs(props.completedAt).format("DD/MM/YYYY"):null } </li>
                      <li className=" cursor-default"><b>Language :</b> {props.language}</li>
                      <li className=" cursor-default"><b>Channel Name :</b> {props.channel} </li>
                      
                      <li className=" cursor-default"><b>Remarks:</b> {props.remarks} </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Modal2