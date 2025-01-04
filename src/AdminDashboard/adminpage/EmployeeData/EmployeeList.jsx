import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../redux/userSlice";
import { FaThLarge } from "react-icons/fa";

const EmployeeManagement = () => {
  const [viewType, setViewType] = useState("grid");
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const fallbackEmployees = [
    {
      name: "Danny Ward",
      lineManager: "Richard Wilson",
      team: "Design",
      office: "Focus Technologies",
      permissions: "Team Lead",
      status: "Active",
    },
    {
      name: "Linda Craver",
      lineManager: "Richard Wilson",
      team: "IOS",
      office: "Focus Technologies",
      permissions: "Team Lead",
      status: "Invite",
    },
    // Add more fallback data as needed
  ];

  const employees = users?.length ? users : fallbackEmployees;

  return (
    <div className="p-4 md:w-[85rem]">
      {/* Top Navigation */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4">
          <ul className="flex flex-wrap gap-2">
            <li className="flex-grow sm:flex-grow-0">
              <Link
                to="employees-all"
                className="block text-center py-2 px-4 bg-violet-600 text-white rounded-md hover:bg-violet-700"
              >
                All
              </Link>
            </li>
            <li className="flex-grow sm:flex-grow-0">
              <Link
                to="employee-team"
                className="block text-center py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Teams
              </Link>
            </li>
            <li className="flex-grow sm:flex-grow-0">
              <Link
                to="employee-office"
                className="block text-center py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Offices
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 flex flex-wrap items-center justify-between gap-4">
          <h4 className="text-xl font-semibold">
            {loading ? "Loading..." : `${employees.length} People`}
          </h4>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/document"
              onClick={() => setViewType("grid")}
              className={`p-2 ${viewType === "grid" ? "text-violet-600" : "text-gray-600"}`}
            >
              <FaThLarge className="text-xl" />
            </Link>
            <button
              onClick={() => setViewType("list")}
              className={`p-2 ${viewType === "list" ? "text-violet-600" : "text-gray-600"}`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link
              to="/admin/add-employee"
              className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Person
            </Link>
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 uppercase">
                  {employee.fullName || employee.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.email || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.role || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  {employee.status || "Active"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default EmployeeManagement;
