import React,{useState} from 'react'
import {config} from "./Constants"
var url = config.url.API_URL

const Modal6 = () => {
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
        <button onClick={toggleModal}>SUBMIT</button>
      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-transparent  h-[100vh] w-full flex justify-center items-center">
            <div className=" relative p-5 w-fit max-w-[540px] border-black border-2 bg-[#fff] rounded-lg ">
              <div className="content">
                <div className="flex justify-between">
                  <h2 className="text-xl">Are you sure ?</h2>
                  
                </div>

                <p className='m-2'>
                  Are you sure ?
                </p>
               
                <div className="flex gap-2 justify-center items-center">
                <button  className="border-1 bg-[#00ff26] ">
                      YES
                    </button>
                    <button onClick={toggleModal} className="border-1 bg-[#f00]">
                      NO
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

export default Modal6