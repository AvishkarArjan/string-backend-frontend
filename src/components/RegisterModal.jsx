import React, { useState } from "react";
import axios from "axios";
import { AiFillCloseCircle, AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineKey } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import imageCompression from "browser-image-compression";
import {RxLetterCaseToggle} from "react-icons/rx"
import {config} from "./Constants"
var url = config.url.API_URL

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [show, setShow] = useState("password");
  const handleShow = () => {
    if (show === "password") {
      setShow("text");
    } else {
      setShow("password");
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    email_acc:"",
    phone: "",
    password: "",
    cpassword: "",
    profile: "",
  });

  let name, value;
  const handleUser = (event) => {
    // console.log(event.target);
    name = event.target.name;
    value = event.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, phone, password, cpassword, profile, email_acc } = user;
    if(name && email && phone && email_acc && password && cpassword){
      await axios
      .post(`${url}/admin/employees`, {
        name: name,
        email: email,
        email_acc:email_acc,
        phone: phone,
        password: password,
        cpassword: cpassword,
        profile: profile,
        requestType: "new",
      },{withCredentials: true})
      .then((response) => {
        if (response.status == 200) {
          window.alert("Account created successfully !");
          window.location.reload(false);
        } else {
          window.alert(response.error);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Failed to create account");
      });
    }else{
      window.alert("One or more fields missing !");
    }
    
  };

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
      setUser({ ...user, profile: base64 });
      //   console.log(user.profile);
      // console.log(base64);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#3f70ac] text-white  duration-300"
        onClick={toggleModal}
      >
        Create new Account
      </button>

      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-black h-[100vh] w-full flex justify-center items-center cursor-default text-black bg-opacity-70">
            <div className=" relative p-5 w-fit bg-[#fff] rounded-md h-fit mx-8">
              <div className="  flex justify-center items-center">
                <div className=" w-full rounded-lg my-auto bg-[#3366a3] shadow-lg shadow-[#040c16] py-2 px-8 flex flex-col justify-center items-center h-fit">
                  <div className="w-full flex justify-end text-white">
                    <button
                      onClick={toggleModal}
                      className="rounded-full duration-300 bg-white "
                    >
                      <AiFillCloseCircle color="red"  size={30}/> 
                    </button>
                  </div>

                  <p className="text-2xl text-white">
                    Create a new String Account
                  </p>
                  <p className="font-light pb-2 text-white">
                    Enter the details below
                  </p>
                  <form
                    method="POST"
                    className="flex flex-col w-full justify-center items-center"
                  >
                    <div className="w-full flex justify-center pr-6 items-center">
                      <RxLetterCaseToggle size={25} />
                      
                      <input
                        name="name"
                        value={user.name}
                        onChange={(e) => handleUser(e)}
                        type="text"
                        className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none "
                        placeholder="Name"
                      />
                    </div>
                    <div className="w-full flex justify-center pr-6 items-center">
                    <AiOutlineUser size={25} />
                      
                      <input
                        name="email"
                        value={user.email}
                        onChange={(e) => handleUser(e)}
                        type="text"
                        className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
                        placeholder="username@string.com"
                      />
                    </div>
                    <div className="w-full flex justify-center pr-6 items-center">
                      <AiOutlinePhone size={25} />
                      <input
                        name="phone"
                        value={user.phone}
                        onChange={(e) => handleUser(e)}
                        type="text"
                        className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
                        placeholder="Phone No"
                      />
                    </div>
                    <div className="w-full flex justify-center pr-6 items-center">
                    
                      <HiOutlineMail size={25} />
                      <input
                        name="email_acc"
                        value={user.email_acc}
                        onChange={(e) => handleUser(e)}
                        type="text"
                        className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
                        placeholder="Email ID"
                      />
                    </div>

                    <div className="w-full flex justify-center pr-6 items-center">
                      Profile :
                      <input
                        name="profile"
                        lable="image"
                        type="file"
                        onChange={(e) => {
                          handleFileUpload(e);
                        }}
                        className="m-2 w-[80%] p-2 rounded-md shadow-lg outline-none"
                        accept=".jpeg, .png, .jpg"
                      />
                    </div>
                    <div className="w-full flex justify-center pr-6 items-center">
                      <AiOutlineKey size={25} />
                      <input
                        name="password"
                        value={user.password}
                        onChange={(e) => handleUser(e)}
                        type={show}
                        className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="w-full flex justify-center pr-6 items-center">
                      <AiOutlineKey size={25} />
                      <input
                        name="cpassword"
                        value={user.cpassword}
                        onChange={(e) => handleUser(e)}
                        type={show}
                        className="m-2 w-[80%] p-2 rounded-lg h-8 shadow-lg outline-none"
                        placeholder="Re-enter Password"
                      />
                    </div>

                    <div className="flex w-[80%] justify-between items-center">
                      <div></div>
                      <button
                        onClick={PostData}
                        className="px-2 p-1 m-2 bg-[#112D4E] rounded-full text-white hover:bg-[#1d4a7d] duration-100"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                  <div className="w-[80%] flex justify-end">
                    <button
                      className="bg-[#2a5a95] hover:bg-[#19375b] px-2 rounded-full text-white duration-100"
                      onClick={handleShow}
                    >
                      Show Password
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

export default RegisterModal;

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
