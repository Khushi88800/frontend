import React, { useState } from 'react'
import { FaHome } from 'react-icons/fa';
import { FcStatistics } from 'react-icons/fc';
import { HiInboxArrowDown } from 'react-icons/hi2';
import { IoIosNotifications, IoMdSettings } from 'react-icons/io';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './adminpage/Dashboard';
import Setting from './adminpage/Setting';

function AdminDashboard() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (


    <div className='min-h-screen pt-5 flex flex-col flex-wrap gap-10  '>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-cyan-900 text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 w-64`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-center">Admin Panel</h2>
            <button
              onClick={toggleSidebar}
              className="block md:hidden text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <ul className="mt-4 space-y-4">
            <li className="hover:bg-cyan-950">
              <Link href="/admin/dashboard" className="flex items-center px-4 py-2 space-x-2">
                <FaHome /> <span>Dashboard</span>
              </Link>
            </li>
            <li className="hover:bg-cyan-950">
              <Link href="#statistics" className="flex items-center px-4 py-2 space-x-2">
                <FcStatistics /> <span>Statistics</span>
              </Link>
            </li>
            <li className="hover:bg-cyan-950">
              <Link href="#inbox" className="flex items-center px-4 py-2 space-x-2">
                <HiInboxArrowDown /> <span>Inbox</span>
              </Link>
            </li>
            <li className="hover:bg-cyan-950">
              <Link href="#notifications" className="flex items-center px-4 py-2 space-x-2">
                <IoIosNotifications /> <span>Notifications</span>
              </Link>
            </li>
            <li className="hover:bg-cyan-950">
              <Link href="/admin/settings" className="flex items-center px-4 py-2 space-x-2">
                <IoMdSettings /> <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 md:ml-32 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </div>
    </div>

  )
}

export default AdminDashboard