import React, { useState } from "react";
import axios from "axios";
import {config} from "./Constants"
var url = config.url.API_URL

const DelAcc = (props) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const delUser = async (event) => {
    event.preventDefault();
    await axios
      .post(`${url}/admin/employees`, {
        requestType: "delete",
        _id: props.data._id,
      },{withCredentials: true})
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          window.alert("Succesfully deleted account");
          window.location.reload(false);
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  };

  return (
    <div>
      <button
        className=" rounded-full px-2 text-white shadow-lg  duration-300 hover:bg-[#EB455F] bg-[#bf4125]"
        onClick={toggleModal}
      >
        Delete
      </button>
      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-black bg-opacity-80 h-[100vh] w-full flex justify-center items-center">
            <div className=" relative p-5 px-10 w-fit  max-w-[700px] bg-[#fff] rounded-lg  mx-8">
              <div className="content">
                <div className="flex flex-col gap-8 justify-center items-center">
                  <h2 className="text-xl text-black ">Are you sure ?</h2>
                  <div className="flex gap-7">
                    <button
                      onClick={(e)=>delUser(e)}
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

export default DelAcc;
