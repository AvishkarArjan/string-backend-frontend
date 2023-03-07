import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Projects from "./components/Projects";
import Employees from "./components/Employees";
import NavbarEmp from "./components/NavbarEmp";
import HomeEmp from "./components/HomeEmp";
import CreateProject from "./components/CreateProject";
import CompProjects from "./components/CompProjects";
import AllProjects from "./components/AllProjects";
import ManageEmp from "./components/ManageEmp";
import Logout from "./components/Logout";
import SendEmail from "./components/SendEmail";
import ChangePassword from "./components/ChangePassword";
import CalendarEmp from "./components/CalenEmp";
import Calendar from "./components/Calen";
import Leaves from "./components/Leaves";
import LeavesEmp from "./components/LeavesEmp";
import Redirect from "./components/Redirect";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <ErrorPage /> */}
      {/* <Home /> */}
      <NavbarEmp />
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/createproject" element={<CreateProject />} />
        <Route path="/admin/allprojects" element={<AllProjects />} />
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/manage" element={<ManageEmp />} />
        <Route path="/admin/Calendar" element={<Calendar />} />
        <Route path="/admin/leaves" element={<Leaves />} />

        <Route path="/employee" element={<HomeEmp />} />
        <Route path="/employee/completedprojects" element={<CompProjects />} />
        <Route path="/employee/calendar" element={<CalendarEmp />} />
        <Route path="/employee/leaves" element={<LeavesEmp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
