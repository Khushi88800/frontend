import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileNav() {
  return (
    <div className="border rounded-lg overflow-hidden p-2 bg-white">
    <ul className="flex flex-wrap md:flex-nowrap">
      <NavLink
        to="/employees/profile"
        className={({ isActive }) =>
          `w-full md:w-auto px-6 py-3 text-center border-b md:border-b-0 md:border-r hover:bg-yellow-600 transition-colors ${isActive ? 'bg-yellow-500 text-gray-800 font-medium' : 'text-gray-700'
          }`
        }
      >
        Employment
      </NavLink>
      <NavLink
        to="/employees/details"
        className={({ isActive }) =>
          `w-full md:w-auto px-6 py-3 text-center border-b md:border-b-0 md:border-r hover:bg-gray-50 transition-colors ${isActive ? 'bg-yellow-500 text-gray-800 font-medium' : 'text-gray-700'
          }`
        }
      >
        Detail
      </NavLink>
      <NavLink
        to="/employees/employee-doc"
        className={({ isActive }) =>
          `w-full md:w-auto px-6 py-3 text-center border-b md:border-b-0 md:border-r hover:bg-gray-50 transition-colors ${isActive ? 'bg-yellow-500 text-gray-800 font-medium' : 'text-gray-700'
          }`
        }
      >
        Document
      </NavLink>
      <NavLink
        to="/employees/payroll"
        className={({ isActive }) =>
          `w-full md:w-auto px-6 py-3 text-center border-b md:border-b-0 md:border-r hover:bg-gray-50 transition-colors ${isActive ? 'bg-yellow-500 text-gray-800 font-medium' : 'text-gray-700'
          }`
        }
      >
        Payroll
      </NavLink>
      <NavLink
        to="/employees/timeoff"
        className={({ isActive }) =>
          `w-full md:w-auto px-6 py-3 text-center border-b md:border-b-0 md:border-r hover:bg-gray-50 transition-colors ${isActive ? 'bg-yellow-500 text-gray-800 font-medium' : 'text-gray-700'
          }`
        }
      >
        Timeoff
      </NavLink>
      <NavLink
        to="/employees/reviews"
        className={({ isActive }) =>
          `w-full md:w-auto px-6 py-3 text-center border-b md:border-b-0 md:border-r hover:bg-gray-50 transition-colors ${isActive ? 'bg-yellow-500 text-gray-800 font-medium' : 'text-gray-700'
          }`
        }
      >
        Reviews
      </NavLink>
      <NavLink
        to="/employees/settings"
        className={({ isActive }) =>
          `w-full md:w-auto px-6 py-3 text-center hover:bg-gray-50 transition-colors ${isActive ? 'bg-yellow-500 text-gray-800 font-medium' : 'text-gray-700'
          }`
        }
      >
        Settings
      </NavLink>
    </ul>
  </div>
  
  );
}