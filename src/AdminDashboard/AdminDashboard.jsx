import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaChartLine,
  FaHome,
  FaRegUserCircle,
  FaSignOutAlt,
  FaStar,
  FaSuitcase,
  FaTasks,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { IoMdClose, IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./adminpage/Dashboard";
import Setting from "./adminpage/Setting";
import SalaryPage from "./adminpage/SalaryPage";
import EmployeeCard from "./adminpage/EmployeeData/EmployeeCard";
import { useDispatch, useSelector } from "react-redux";
import CalendarPage from "./adminpage/Calender";
import Company from "./adminpage/Company";
import LeaveApplicationForm from "./adminpage/Leave";
import RoleCardsGrid from "./adminpage/Manage";
import EmployeeManagement from "./adminpage/EmployeeData/EmployeeList";
import { IoPersonOutline } from "react-icons/io5";
import ReviewsComponent from "./adminpage/Review";
import CompanySettings from "./adminpage/CompanySetting";
import { logout } from "../redux/userSlice";
import EmployeeForm from "./adminpage/EmployeeData/AddEmployee";
import logo from '../assets/VN LOGO.jpeg'

function AdminDashboard() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);
  const [isOpen, setIsOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    const res = await dispatch(logout());

    if (res?.payload?.success) {
      navigate("/");
    }
  };

  //function Date and Time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatDate = now.toLocaleDateString();
      const formatTime = now.toLocaleTimeString();
      setDateTime(`${formatDate}-${formatTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  flex flex-col lg:flex-row min-h-screen bg-gray-50  ">
      <button
        onClick={toggleSidebar}
        className="lg:hidden  fixed  p-2 focus:outline-none rounded-md shadow-md"
      >
        {/* <IoPersonOutline className="text-2xl" /> */}
        <header className="fixed top-0 left-0 right-0 z-5 bg-gradient-to-r from-violet-900 to-violet-950 shadow-md">
          <div className="flex items-center justify-between p-4">
            {/* Brand Name */}
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Profile Icon Button */}
              <button className="bg-gray-100 p-2 rounded-full focus:outline-none">
                <IoPersonOutline className="text-xl sm:text-2xl" />
              </button>
            </div>
          </div>
        </header>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0  z-50  h-full w-64  lg:w-64 p-4 bg-white shadow-md
          transition-transform duration-300 ease-in-out
               transform ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none
        `}
      >
        {/* Header */}

        {/* Profile Section */}
        <div className="p-4 border-purple-800">
          <div className="flex gap-2 items-center">
            <Link to="/admin" onClick={() => setIsOpen(false)}>
              <h3 className="text-lg font-medium text-gray-800 cursor-pointer">
                Home
              </h3>
            </Link>
            <span className="text-gray-400">/</span>
            <p className="text-sm font-light text-gray-500">Dashboard</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-md ">
          <img
            src={userData?.avatar?.secure_url || "/usertwo.png"}
            className="w-24 h-24 border-4 hover:border-indigo-300 bg-gray-300 rounded-full mx-auto flex items-center justify-center"
          />

          <h2 className="text-sm text-gray-500 text-center ">Welcome Admin</h2>
          <p className="text-center text-gray-500">{dateTime}</p>
        </div>

        {/* Navigation */}
        <nav className="p-8 grid grid-cols-2 bg-white gap-4 fixed  left-0 z-50 top-auto h-[80px] ">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `py-3 text-center rounded-lg  transition-colors ${isActive
                ? "flex flex-col items-center  text-yellow-600 hover:text-black hover:bg-yellow-500 p-3 rounded-lg"
                : "hover:bg-gray-200 text-gray-700"
              }`
            }
          >
            <FaHome className="text-2xl flex items-center" />
            <span className="text-sm font-medium mt-2">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/document"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <FaUsers className="text-2xl" />
            <span className="text-sm font-medium mt-2">Employees</span>
          </NavLink>
          <NavLink
            to="/admin/company"
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <FaBuilding className="text-2xl" />
            <span className="text-sm font-medium mt-2">Company</span>
          </NavLink>
          <NavLink
            to="/admin/calendar"
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <FaCalendarAlt className="text-2xl" />
            <span className="text-sm font-medium mt-2">Calendar</span>
          </NavLink>
          <NavLink
            to="/admin/leave"
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <FaSuitcase className="text-2xl" />
            <span className="text-sm font-medium mt-2">Leave</span>
          </NavLink>
          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <FaStar className="text-2xl" />
            <span className="text-sm font-medium mt-2">Reviews</span>
          </NavLink>
          <NavLink
            to="/admin/salary"
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <FaChartLine className="text-2xl" />
            <span className="text-sm font-medium mt-2">Salary</span>
          </NavLink>
          <NavLink
            to="/admin/manage"
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <FaTasks className="text-2xl" />
            <span className="text-sm font-medium mt-2">Manage</span>
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <IoMdSettings className="text-2xl" />
            <span className="text-sm font-medium mt-2">Settings</span>
          </NavLink>
          <NavLink
            to="/admin/me"
            className={({ isActive }) =>
              `flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-200 p-3 rounded-lg ${isActive
                ? " bg-yellow-500 text-gray-800 font-medium px-6"
                : "text-gray-700"
              }`
            }
          >
            <FaUser className="text-2xl" />
            <span className="text-sm font-medium mt-2">Profile</span>
          </NavLink>
        </nav>
        {isLoggedIn && (
          <div className="fixed bottom-0 left-0 right-0  bg-white border-t border-gray-200 p-4 md:hidden">
            <div className="flex justify-between gap-2 items-center max-w-screen-xl mx-auto px-4">
              <Link
                to="/employees/profile"
                className="flex items-center  bg-violet-800 text-white px-4 py-2  rounded-lg hover:bg-violet-900 transition-colors"
              >
                <FaUser className="text-lg" />
                <span className="font-semibold">Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center  bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}

      <div className="flex-1  px-4 pb-4   min-h-screen   ">
        <header className="hidden lg:block bg-gradient-to-r from-violet-900 to-violet-950 p-6 sticky top-0 z-50 bottom-0 rounded-tl-xl rounded-tr-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo and Title */}
            <div className="flex items-center">
              <Link to="/admin">
                <span className="text-white text-2xl font-bold">
                  Welcome to The Admin Dashboard
                </span>
              </Link>
            </div>

            {/* Right Side Elements */}
            <div className="flex items-center justify-between space-x-6 xl:space-x-8 2xl:space-x-10  md:space-x-6">
              {/* Search Bar */}
              <div className="relative flex items-center">
                {/* Search Icon for Mobile */}
                <div className="lg:hidden flex items-center bg-violet-900 justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white/70"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>

                {/* Full Search Bar for Larger Screens */}
                <div className="hidden lg:flex items-center w-80 rounded-full bg-white/10 backdrop-blur-sm focus-within:shadow-md">
                  <input
                    type="search"
                    placeholder="Search here"
                    className="w-full rounded-full px-4 py-2 bg-transparent text-white placeholder-white/70 outline-none focus:border-yellow-400"
                  />
                  <div className="flex items-center pr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white/70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative group">
                <Link
                  to="/admin/leave"
                  className="text-white rounded-full transition-all"
                >
                  <FaBriefcase className="w-6 h-6" />
                </Link>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-900 text-white text-sm rounded py-3 px-3 shadow-lg">
                  Leave
                </div>
              </div>

              {/* User Profile Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {/* Button */}
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 ring-2 ring-white/20 group-hover:ring-white/40 transition-all overflow-hidden">
                    <img
                      src={userData?.avatar?.secure_url || "/usertwo.png"}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 pt-1 bg-white text-gray-800 shadow-lg rounded-lg w-48 transform transition-all duration-300">
                    <div className="py-1">
                      <Link to="/admin">
                        <span className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <span className="mr-2">
                            <FaRegUserCircle className="text-xl" />
                          </span>{" "}
                          Profile
                        </span>
                      </Link>
                      <Link to="/admin/settings">
                        <span className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <span className="mr-2">
                            <IoMdSettings className="text-xl" />
                          </span>{" "}
                          Settings
                        </span>
                      </Link>
                      <Link onClick={handleLogout}>
                        <span className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <span className="mr-2 font-semibold">
                            <CiLogout className="text-xl" />
                          </span>{" "}
                          Logout
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="mt-6 max-w-[1920px] mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/salary" element={<SalaryPage isAdmin={true} />} />
            <Route path="/document" element={<EmployeeCard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/company" element={<Company />} />
            <Route path="/leave" element={<LeaveApplicationForm />} />
            <Route path="/manage" element={<RoleCardsGrid />} />
            <Route path="/reviews" element={<ReviewsComponent />} />
            <Route path="/employee-list" element={<EmployeeManagement />} />
            <Route path="/me" element={<CompanySettings />} />
            <Route path="/add-employee" element={<EmployeeForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;