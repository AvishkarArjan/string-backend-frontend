import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo2 from "../assets/logo2.png";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoMdVideocam } from "react-icons/io";
import { HiUsers } from "react-icons/hi";
import { BsCalendar3 } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import {FiUserPlus} from "react-icons/fi"
import {FaUserClock} from "react-icons/fa"

const Navbar = () => {
  const location = useLocation();
  const [showNav, setShowNav] = useState("hidden");
  const Routes = [
    "/",
    "/login",
    "/register",
    "/logout",
    "/send-email",
    "/change-password",
    "/employee",
    "/employee/account",
    "/employee/calendar",
    "/employee/leaves",
    "/employee/completed_projects",
  ];
  useEffect(() => {
    for (let i = 0; i < Routes.length; i++) {
      if (location.pathname === Routes[i]) {
        setShowNav("hidden");
        break;
      } else {
        setShowNav();
      }
    }
    // console.log("this is location", location);
  }, [location]);

  return (
    <div
      name="home"
      className={
        showNav +
        " fixed h-[60px] flex justify-between items-center w-screen bg-[#112D4E] text-sm text-gray-300 px-4"
      }
    >
      <div className="flex justify-center items-center pointer-none">
        <button>
          <a to={"/"} smooth={true} offset={50} duration={500} className="">
            <img src={Logo2} alt="Logo Image" style={{ width: "50px" }} />
          </a>
        </button>
        <ul className="flex justify-center items-center ">
          <li className="flex flex-col hover:border-b-[3px] border-[#D36B00] justify-center items-center">
            
            <NavLink to="/admin" smooth={true} offset={50} duration={500} className="flex flex-col justify center items-center ">
            <AiFillHome size={20} />
              Home
            </NavLink>
          </li>

          <li className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00] ">
            
            <NavLink
              to="/admin/projects"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify center items-center "
            ><IoMdVideocam size={20} />
              Projects
            </NavLink>
          </li>
          <li className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00]">
            
            <NavLink
              to="/admin/employees"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify center items-center "
            ><HiUsers size={20} />
              Employees
            </NavLink>
          </li>
          <li className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00]">
            
            <NavLink
              to="/admin/calendar"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify center items-center "
            ><BsCalendar3 size={20} />
              Calendar
            </NavLink>
          </li>
          <li className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00]">
            
            <NavLink
              to="/admin/leaves"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify center items-center "
            ><FaUserClock size={20} />
              Leaves
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <ul className=" md:flex justify-center items-center gap-3">
          <li
            onClick="/"
            className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00]"
          >
            <MdLogout size={20} />
            <NavLink to="/logout" smooth={true} offset={50} duration={500}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
