import React, { useState } from "react";
import {config} from "./Constants"
var url = config.url.API_URL

const Modal4 = (props) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const deleteProject = async (event) => {
    event.preventDefault();
    // console.log(value);
    const _id = props.data._id;

    const res = await fetch(`${url}/admin/allprojects`, {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        requestType: "delete",
      }),
    });
    const data = await res.json();
    // console.log("this is data",data);

    if (res.status === 422 || !data) {
      window.alert("Deletion Failed");
      console.log("Deletion Failed");
    } else {
      window.alert("Successfully Deleted");
      console.log("Successfully Deleted");
      window.location.reload(false);
    }
  };
  return (
    <div>
      <button className=" rounded-full px-2 text-white shadow-lg  duration-300 hover:bg-[#EB455F] bg-[#bf4125]" onClick={toggleModal}>
        Delete
      </button>
      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-black bg-opacity-80 h-[100vh] w-full flex justify-center items-center">
            <div className=" relative p-5 px-10 w-fit  max-w-[700px] bg-[#fff] rounded-lg  mx-8">
              <div className="content">
                <div className="flex flex-col gap-8 justify-center items-center">
                  <h2 className="text-xl ">Are you sure ?</h2>
                  <div className="flex gap-7">
                    <button
                      onClick={deleteProject}
                      className="bg-[#f00] hover:bg-[#942c2c] duration-200 text-white px-2 rounded-full"
                    >
                      Delete
                    </button>
                    <button
                      onClick={toggleModal}
                      className=" bg-[#3F72AF] hover:bg-[#2a4b75] duration-200 rounded-full px-2 text-white"
                    >
                      Cancel
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

export default Modal4;
