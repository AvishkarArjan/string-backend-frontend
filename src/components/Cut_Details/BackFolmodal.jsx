import React, { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import dayjs from "dayjs";
import { AiFillCloseCircle } from "react-icons/ai";
import {config} from "../Constants"
var url = config.url.API_URL

const BackFolmodal = (props) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const [backupData, setBackupData] = useState({
    backupFolder: "",
    backupImage: "",
  });

  const handleProject = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    setBackupData({ ...backupData, backupFolder: val });
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
      setBackupData({ ...backupData, backupImage: base64 });
      // console.log(work);
      // console.log(base64);
    } catch (error) {
      console.log(error);
    }
  };

  const PostData = async (event) => {
    event.preventDefault();
    const { backupFolder, backupImage } = backupData;
    console.log(backupData);
    try {
      if (!backupFolder) {
        window.alert("Enter backup folder path !");
      } else if (!backupImage) {
        window.alert("Enter screenshot !");
      } else {
        await axios
          .post(`${url}/employee`, {
            title: props.data.title,
            backupFolder: backupFolder,
            backupImage: backupImage,
            backup: true,
          },{withCredentials: true})
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              window.location.reload(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
      if (error.status == 413) {
        window.alert("File size too large !");
        window.location.reload(false);
      }
    }
  };

  return (
    <div>
      <button
        className="bg-[#4c87ce] px-2 rounded-full hover:bg-[#3f70ac] text-white shadow-md duration-300"
        onClick={toggleModal}
      >
        Update Backup Folder
      </button>

      {modal && (
        <div className="">
          <div className="fixed top-0 left-0 overlay bg-black h-[100vh] w-full flex justify-center items-center cursor-default text-black bg-opacity-70">
            <div className=" relative p-5 grid grid-cols-1 lg:grid-cols-2 w-fit bg-[#fff] rounded-md h-fit mx-8">
              <div className="content w-fit">
                <div className="flex justify-between ">
                  <h2 className="text-2xl">{props.data.title}</h2>
                  <div className="flex gap-2"></div>
                </div>
                <div>
                  <img src={props.project.thumbnail} className="w-full max-w-[200px]" alt="" />
                </div>

                <div className="flex justify-start gap-12 items-start m-2"></div>
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
                    <b className="text-2xl italic">Backup Details</b>
                    <button
                      onClick={toggleModal}
                      className="rounded-full duration-300  "
                    >
                      <AiFillCloseCircle color="red"  size={30}/>
                    </button>
                  </div>
                  <br />
                  <p className="flex">
                     <b className="w-14 flex justify-start items-start">
                       NOTE :
                     </b>
                     <p className="w-fit flex justify-start items-start italic">
                     Check that the project doesn't contain any missing files !
                     </p>
                   </p>
                   <br />

                  <div className="flex justify-start items-start p-1 gap-2">
                    <p>Add Backupt folder path : </p>
                    <input
                      className="bg-[#DBE2EF] rounded-md outline-none px-2"
                      type="text"
                      name="backupFolder"
                      onChange={(e) => handleProject(e)}
                    />
                  </div>

                  <div className="flex justify-start items-start p-1 gap-2">
                    <p>Upload Screenshot : </p>
                    <input
                      className="bg-[#DBE2EF] rounded-r-md outline-none"
                      type="file"
                      name="backupImage"
                      onChange={(e) => {
                        handleFileUpload(e);
                      }}
                      accept=".jpeg, .png, .jpg"
                    />
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
                  <button
                    onClick={PostData}
                    className="bg-[#112D4E] hover:bg-[#215590] rounded-full text-white px-2 mt-4"
                  >
                    Upload Backup Folder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackFolmodal;

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
