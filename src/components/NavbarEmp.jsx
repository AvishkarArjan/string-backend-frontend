import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo2 from "../assets/logo2.png";
import { MdLogout } from "react-icons/md";
import { FaUserCircle, FaUserClock } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import { IoMdVideocam } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";

const NavbarEmp = () => {
  const location = useLocation();
  const [showNav, setShowNav] = useState("hidden");
  const Routes = [
    "/",
    "/logout",
    "/login",
    "/register",
    "/admin",
    "/send-email",
    "/change-password",
    "/admin/projects",
    "/admin/attendance",
    "/admin/employees",
    "/admin/account",
  ];
  useEffect(() => {
    for (let i = 0; i < Routes.length; i++) {
      if (
        location.pathname === Routes[i] ||
        location.pathname.includes("/admin")
      ) {
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
        " fixed h-[60px] flex justify-between items-center w-full bg-[#112D4E] text-sm text-gray-300 px-4"
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
            <NavLink
              to="/employee"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify-center items-center"
            >
              <AiFillHome size={20} />
              Home
            </NavLink>
          </li>

          {/* <li className="inline hover:border-b-[3px] border-[#D36B00]">
            <NavLink to="/login" smooth={true} offset={50} duration={500}>
              Login
            </NavLink>
          </li>
          <li className="inline hover:border-b-[3px] border-[#D36B00]">
            <NavLink to="/register" smooth={true} offset={50} duration={500}>
              Register
            </NavLink>
          </li> */}
          <li className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00] ">
            <NavLink
              to="/employee/calendar"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify-center items-center"
            >
              <BsCalendar3 size={20} />
              Calendar
            </NavLink>
          </li>
          <li className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00] ">
            <NavLink
              to="/employee/leaves"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify-center items-center"
            >
              <FaUserClock size={20} />
              Leaves
            </NavLink>
          </li>
          <li className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00]">
            <NavLink
              to="/employee/completedprojects"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify-center items-center"
            >
              <IoMdVideocam size={20} />
              My Projects
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <ul className="hidden md:flex justify-center items-center gap-3">
          {/* <li>
              <a href="/" smooth={true} offset={50} duration={500}>
                Home
              </a>
            </li> */}
          {/* <li>
            <NavLink className="flex justify-end items-end text-md gap-1" to="/register">
              Register
              <FiUserPlus size={20} />
            </NavLink>
          </li> */}
          <li>
            <a href="/" className="hover:scale-110">
              <FaUserCircle size={40} />
            </a>
          </li>
          <li className="flex flex-col justify center items-center hover:border-b-[3px] border-[#D36B00]">
            <NavLink
              to="/logout"
              smooth={true}
              offset={50}
              duration={500}
              className="flex flex-col justify-center items-center"
            >
              <MdLogout size={20} />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarEmp;
