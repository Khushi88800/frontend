import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { GetAllEmployees } from "../../Helpers/api";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import EmployeeTable from "../EmployeeData/EmployeeTable";
import AddEmployee from "../EmployeeData/CreateEmployee";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function Dashboard({ onClose }) {
  const [employeeObj, setEmployeeObj] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [employeesData, setEmployeesData] = useState({
    employees: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalEmployees: 0,
      totalPages: 0,
    },
  });

  // Chart data
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // months
    datasets: [
      {
        label: "Employee Growth",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw + " employees";
          },
        },
      },
    },
  };
  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await GetAllEmployees(search, page, limit);
      setEmployeesData(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleUpdateEmployee = (emp) => {
    setEmployeeObj(emp);
    setShowModal(true);
  };
  const handleSearch = (e) => {
    fetchEmployees(e.target.value);
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex-1 md:ml-24 pt-5 flex flex-col gap-10 select-none">
        <div className="bg-gray-800 text-white p-4 md:hidden w-full fixed top-0 left-0 z-50 m-0">
          <button onClick={toggleSidebar} className="text-white">
            ☰
          </button>
        </div>

        <div className="flex items-center justify-between md:space-x-6 md:mt-36 md:ml-64">
          <h1 className="text-3xl font-bold tracking-normal text-black select-none">
            Welcome to the Admin Dashboard
            <span className="text-xl text-center font-semibold italic tracking-tight text-cyan-500 select-none block">
              Employee History Report
            </span>
          </h1>

          <div className="p-1 cursor-pointer pr-1 float-end hidden lg:flex items-center w-56 justify-between max-w-sm border rounded-2xl focus-within:shadow-md ">
            <input
              type="search"
              onChange={handleSearch}
              name="search"
              id="search"
              placeholder="Enter employee name.."
              className="w-full outline-none px-4 py-2 bg-transparent"
            />
            <div className="text-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <RxAvatar className="text-4xl cursor-pointer md:block hidden" />
        </div>
        <div className="overflow-x-auto w-full ">
          <h1 className="text-xl text-center font-semibold tracking-wide text-cyan-800">
            {" "}
            Employee Data
          </h1>
          <Link to="#">
            <button
              onClick={() => setShowModal(true)}
              className="border border-cyan-600 hover:border-cyan-500 transition-all ease-in-out duration-300 rounded-sm px-2.5 py-1.5 text-center font-semibold text-cyan-600"
            >
              Create Employee
            </button>
          </Link>
          {/* <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
            <table className="min-w-full bg-white border-collapse select-none px-3">
              <thead>
                <tr>
                  <th className="p-2 border-b text-left">ID</th>
                  <th className="p-2 border-b text-left">Name</th>
                  <th className="p-2 border-b text-left">Email</th>
                  <th className="p-2 border-b text-left">Phone</th>
                  <th className="p-2 border-b text-left">Department</th>
                  <th className="p-2 border-b text-left">Salary</th>
                  <th className="p-2 border-b text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(employeesData) && employeesData.length > 0 ? (
                  employeesData.map((emp) => (
                    <tr key={emp._id} className="hover:bg-gray-100">
                      <td className="p-2 border-b">{emp._id}</td>
                      <td className="p-2 border-b">{emp.name}</td>
                      <td className="p-2 border-b">{emp.email}</td>
                      <td className="p-2 border-b">{emp.phone}</td>
                      <td className="p-2 border-b">{emp.department}</td>
                      <td className="p-2 border-b">{emp.salary}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="border-b text-center">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> */}
          <EmployeeTable
            employees={employeesData.employees}
            pagination={employeesData.pagination}
            fetchEmployees={fetchEmployees}
            handleUpdateEmployee={handleUpdateEmployee}
          />
          <AddEmployee
            fetchEmployees={fetchEmployees}
            showModal={showModal}
            setShowModal={setShowModal}
            employeeObj={employeeObj}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:mt-10">
          <div className="flex flex-col space-y-5">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Employees
              </h2>
              <p className="text-4xl font-bold text-gray-900">150</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Departments
              </h2>
              <p className="text-4xl font-bold text-gray-900">8</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Active Employees
              </h2>
              <p className="text-4xl font-bold text-gray-900">130</p>
            </div>
          </div>

          {/* Graph Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 col-span-1 md:col-span-1">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Employee Growth{" "}
            </h2>
            {/* Graph placeholder */}
            <div className="h-60 bg-gray-200 rounded-lg">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
