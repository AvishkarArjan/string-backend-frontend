import React,{useState} from 'react'
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import {config} from "../Constants"
var url = config.url.API_URL

const LCAdmin = (props) => {

    const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLastCut1=(event)=>{
    event.preventDefault()
    axios.post(`${url}/admin`,{
      title:props.data.title,
      lastCutAdmin:true,
      adminRemarks:remark,
      regarding:"Last Cut",
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

  const handleLastCut2=(event)=>{
    event.preventDefault()
    axios.post(`${url}/admin`,{
      title:props.data.title,
      lastCut:false,
      adminRemarks:remark,
      regarding:"Last Cut",
    },{withCredentials: true})
    .then((response)=>{
      console.log(response)
      if(response.status==200){
        window.location.reload(false)
      }else{
        console.log(response)
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const [remark, setRemark] = useState("");
  const handleRemark = (event) => {
    setRemark(event.target.value);
  };

  return (
    <div>
        <button
        className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#3f70ac] text-white shadow-md duration-300"
        onClick={toggleModal}
      >
        Review Final Cut
      </button>

      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-black h-[100vh] w-full flex justify-center items-center cursor-default text-black bg-opacity-70">
            <div className=" relative p-5 grid grid-cols-1 sm:grid-cols-2 w-fit bg-[#fff] rounded-md h-fit mx-8">
              <div className="content w-fit">
                <div className="flex justify-between ">
                  <h2 className="text-2xl">{props.data.title}</h2>
                  <div className="flex gap-2"></div>
                </div>
                <div className="flex flex-col justify-start items-start my-2">
                  Uploaded Image :-
                  <img
                    src={props.data.image}
                    className="my-2 w-44 rounded-sm shadow-md shadow-[#717171]"
                    alt=""
                  />
                </div>

                <div className="flex justify-start gap-12 items-start m-2"></div>
                <div className="flex flex-col justify-start items-start m-2">
                  
                  <div className="flex flex-col justify-start items-start p-1 gap-2">
                    <p>Computer name : </p>
                    <p className="bg-[#DBE2EF] rounded-md px-2">{props.data.compName}</p>
                    
                  </div>
                  <div className="flex flex-col justify-start items-start p-1 gap-2">
                    <p>Folder path : </p>
                    <p className="bg-[#DBE2EF] rounded-md px-2">{props.data.folderPath}</p>

                  </div>
                  
                </div>
              </div>
              {/* grid col 2 */}
              <div className=" px-4 flex flex-col justify-between">
                <div className="flex flex-col justify-start items-start">
                  <div className="flex justify-between w-full">
                    <b className="text-2xl italic">Last Cut</b>
                    <button
                      onClick={toggleModal}
                      className="rounded-full duration-300 "
                    >
                      <AiFillCloseCircle color="red"  size={30}/> 
                    </button>
                  </div>
                  <br />
                  <div className="flex flex-col justify-start items-start max-w-[400px] w-full">
                    <p className="text-xl">Accept Last cut ?</p>
                  </div>
                  <div className="my-4">
                    <p>
                      <b>Add a remark :-</b>
                    </p>
                    <div>
                      <textarea
                        className="border-2 border-[#8d8d8d] rounded-md outline-none p-2"
                        onChange={(e)=>{handleRemark(e)}}
                        name=""
                        id=""
                        cols="25"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-end gap-2">
                  <button
                    className="bg-[#112D4E] hover:bg-[#215590] rounded-full text-white px-2"
                    onClick={(e) => handleLastCut1(e)}
                  >
                    Accept last Cut
                  </button>
                  <button
                    className="bg-[#b81818] hover:bg-[#215590] rounded-full text-white px-2"
                    onClick={(e) => handleLastCut2(e)}
                  >
                    Reject last cut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default LCAdmin