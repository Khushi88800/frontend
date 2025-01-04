import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoGraph } from "react-icons/go";
import { FcLeave } from "react-icons/fc";
import { LuIndianRupee, LuRefreshCw } from "react-icons/lu";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { FaUsers } from "react-icons/fa";
import { getStatsData } from "../../redux/statSlice";


function Dashboard() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const admins = users?.filter((user) => user?.role === "ADMIN");
  const { allUsersCount, allLeavesCount } = useSelector(
    (state) => state.stat
  );


  ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

  // Pie Chart Data
  const pieData = {
    labels: ["Dept A", "Dept B", "Dept C", "Dept D", "Dept E"],
    datasets: [
      {
        data: [400, 300, 300, 200, 100],
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"],
        hoverBackgroundColor: ["#0077E6", "#00B38C", "#E6AA20", "#E67330", "#744DAC"],
      },
    ],
  };

  // Line Chart Data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Unit 1",
        data: [2, 4, 6, 8, 10],
        borderColor: "#FF8042",
        backgroundColor: "rgba(255, 128, 66, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Unit 2",
        data: [20, 18, 14, 10, 8],
        borderColor: "#0088FE",
        backgroundColor: "rgba(0, 136, 254, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };



  useEffect(() => {
    dispatch(getStatsData());
  }, [dispatch]);


  return (
    <>
      <div className="max-h-screen bg-gray-50 pt-12 lg:p-1">
        <div className="max-w-full p-6 rounded-xl shadow-md ">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="gradient-bg hover:opacity-90 text-white py-2 px-4 rounded-md shadow-lg text-base md:text-lg transition-all duration-300 whitespace-nowrap w-full sm:w-auto">
              Admin Dashboard
            </button>
            <Link to="/employees/profile" className="w-full sm:w-auto">
              <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition-all text-base md:text-lg whitespace-nowrap w-full">
                Employees Dashboard
              </button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Stats cards with consistent spacing */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-purple-900 p-3 rounded-lg">
                  <FaUsers className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Employees</p>
                  <p className="text-xl font-bold">{allUsersCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 p-3 rounded-lg">
                  <GoGraph className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Companies</p>
                  <p className="text-xl font-bold">30</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 p-3 rounded-lg">
                  <FcLeave className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Leaves</p>
                  <p className="text-xl font-bold">{allLeavesCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 p-3 rounded-lg">
                  <LuIndianRupee className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Salary</p>
                  <p className="text-xl font-bold">$5.8M</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold mb-4">Total Employees</h3>
              <hr className="mb-4" />
              <div className="h-[300px] w-full flex justify-center items-center">
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                />
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold mb-4">Total Salary By Unit</h3>
              <hr className="mb-4" />
              <div className="h-[300px] w-full">
                <Line
                  data={lineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <Line type="monotone" dataKey="php" stroke="#8884d8" />
                  <Line type="monotone" dataKey="android" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="ios" stroke="#ffc658" />
                </Line>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Updates */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Today</h4>
                <button className="text-blue-500 hover:text-blue-700">
                  <LuRefreshCw />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <p>No Birthdays Today</p>
                </div>
                <hr />
                <div className="flex items-center gap-3 text-gray-700">
                  <p>Ralph Baker is off sick today</p>
                </div>
              </div>
            </div>

            {/* Team Leads */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Team Leads</h4>
                <Link to="/admin/document">
                  <span className="text-blue-500 hover:text-blue-700">Manage Team</span>
                </Link>
              </div>
              <div className="space-y-4">
                {admins && admins.length > 0 ? (
                  admins.map((admin) => (
                    <div key={admin.id} className="flex items-center gap-3">
                      <img
                        src={admin?.avatar?.secure_url || "/default-avatar.png"}
                        alt={`${admin.fullName}'s profile`}
                        className="w-10 h-10 bg-gray-200 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium uppercase">{admin.fullName}</p>
                        <p className="text-md text-gray-500">Admin</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No admin users found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard