import React, { useState } from "react";

const Modal7 = () => {
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
      <button onClick={toggleModal}>{open}</button>
      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-gray-600 h-[100vh] w-full flex justify-center items-center">
            <div className=" relative p-5 w-full max-w-[540px] bg-[#fff] rounded-lg h-96 mx-8">
              <div className="content">
                <div className="flex justify-between">
                  <h2 className="text-xl">Hello</h2>
                  <div className="flex gap-2">
                
                    <button
                      onClick={toggleModal}
                      className="border-1 bg-[#f00] rounded-full"
                    >
                      X Close
                    </button>
                  </div>
                </div>

              
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal7;
