import axios from "axios";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { AiFillCloseCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import {config} from "./Constants"
var url = config.url.API_URL

const UpdateAcc = (props) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [value, setValue] = useState(props.data);

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
      setValue({ ...value, profile: base64 });
      // console.log(file);
      console.log(base64);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAccount = async (event) => {
    event.preventDefault();
    const { name, email, phone, profile,_id } = value;
    const email_acc = value.email_acc?value.email_acc:"";

    await axios
      .post(`${url}/admin/employees`, {
        name: name,
        email: email,
        email_acc:email_acc,
        phone: phone,
        profile: profile,
        requestType: "update",
        _id:_id
      },{withCredentials: true})
      .then((response) => {
        if (response.status == 200) {
          window.alert("successfully updated account !");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let name, val;
  const handleUpdate = (event) => {
    // console.log(event.target);
    name = event.target.name;
    val = event.target.value;

    setValue({
      ...value,
      [name]: val,
    });
  };

  return (
    <div>
      <button
        className="bg-[#8FD9A8] text-black rounded-full px-2 w-36"
        onClick={toggleModal}
      >
        Update Account
      </button>

      {modal && (
        <div className="text-black">
          <div className="fixed top-0 left-0 overlay bg-black bg-opacity-70 h-[100vh] w-full flex justify-center items-center">
            <div className=" relative p-5 w-full  max-w-[700px] bg-[#fff] rounded-lg  mx-8">
              <div className="content">
                <div className="flex justify-between items-start">
                  <h2 className="italic text-2xl border-b-[6px] w-fit border-[#3F72AF]">
                    Update Account Details
                  </h2>
                  <div className="flex gap-2">
                    <button
                      className="rounded-full text-white bg-[#679b79] hover:bg-[#527c61] duration-200 shadow-lg shadow-[#adadad] px-2"
                      onClick={updateAccount}
                    >
                      Update
                    </button>

                    <button
                      onClick={toggleModal}
                      className=" rounded-full border- shadow-lg shadow-[#adadad]"
                    >
                      <AiFillCloseCircle color="red" size={30} />
                    </button>
                  </div>
                </div>

                <br />

                <div className="m-2 h-96 overflow-hidden overflow-y-scroll">
                  <div className="w-full flex justify-start items-center">
                    Name:
                    <input
                      name="name"
                      value={value.name}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full  p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div className="w-full flex justify-start items-center">
                    String ID :
                    <input
                      name="email"
                      value={value.email}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full max-w-[300px] p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Username"
                    />
                  </div>
                  <div className="w-full flex justify-start items-center">
                    Email ID :
                    <input
                      name="email_acc"
                      value={value.email_acc}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full max-w-[300px] p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Username"
                    />
                  </div>

                  <div className="w-full flex justify-start items-center">
                    Phone no:
                    <input
                      name="phone"
                      value={value.phone}
                      onChange={handleUpdate}
                      type="text"
                      className="m-2 w-full max-w-[300px] p-2 rounded-md shadow-lg shadow-[#adadad] outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div className="w-full flex justify-start pr-6 items-center">
                    Profile Pic :
                    <input
                      name="profile"
                      lable="image"
                      type="file"
                      onChange={(e) => {
                        handleFileUpload(e);
                      }}
                      className="m-2 w-[80%] max-w-[300px] p-2 rounded-md shadow-lg outline-none"
                      accept=".jpeg, .png, .jpg"
                    />
                  </div>
                  <div className="w-full flex justify-end items-end pr-6 mt-5 ">
                    <NavLink to="/send-email" className="hover:underline " >
                      Click to update password
                    </NavLink>
                    
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

export default UpdateAcc;

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
