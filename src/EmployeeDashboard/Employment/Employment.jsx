import React, { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import ProfileNav from "../Navbar/ProfileNav";
import { format } from 'date-fns';

import {
  clearMessages,
  clockIn,
  clockOut,
  fetchAttendanceHistory,
} from "../../redux/attendenceSlice";
import { getStatsData } from "../../redux/statSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { attendanceHistory, loading, error, successMessage } = useSelector(
    (state) => state.attendance
  );
  const userData = useSelector((state) => state?.auth?.data);
  const { allAttendenceCount } = useSelector(
    (state) => state?.stat
  );

  const stat = {
    present: 22,
    late: 3,
    earlyLeave: 1,
    absent: 2,
  };

  const safeFormatDate = (dateValue, formatString) => {
    try {
      if (!dateValue) {
        return 'N/A';
      }
      return format(new Date(dateValue), formatString);
    } catch (error) {
      console.error('Invalid date value:', dateValue, error);
      return 'Invalid Date';
    }
  };

  const handleClockIn = async () => {
    await dispatch(clockIn());
  };

  const handleClockOut = async () => {
    await dispatch(clockOut());
  };

  useEffect(() => {
    dispatch(fetchAttendanceHistory({}));
    dispatch(getStatsData());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:p-1">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <ProfileNav />
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full ring-4 ring-purple-100 overflow-hidden">
                  <img
                    src={userData?.avatar?.secure_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">
                    {userData?.fullName}
                  </h2>
                  <p className="text-gray-600">
                    Senior Developer - Engineering
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <button
                  className="group relative flex items-center gap-3 overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-green-600 px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                  onClick={handleClockIn}
                  disabled={loading}
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <CiClock2 className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="font-medium tracking-wide text-white">
                    {loading ? "Clocking In..." : "Clock In"}
                  </span>
                </button>

                <button
                  className="group relative flex items-center gap-3 overflow-hidden rounded-lg bg-gradient-to-br from-red-400 to-red-600 px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                  onClick={handleClockOut}
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <IoIosLogOut className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="font-medium tracking-wide text-white">
                    Clock Out
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-md">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold text-green-600">
                {allAttendenceCount}
              </h3>
              <p className="text-green-600 font-medium">Present</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold text-yellow-600">
                {stat.late}
              </h3>
              <p className="text-yellow-600 font-medium">Late</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold text-blue-600">
                {stat.earlyLeave}
              </h3>
              <p className="text-blue-600 font-medium">Early Leave</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold text-red-600">
                {stat.absent}
              </h3>
              <p className="text-red-600 font-medium">Absent</p>
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Attendance History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="px-6 py-3 text-left rounded-l-lg">Date</th>
                    <th className="px-6 py-3 text-left">Clock In</th>
                    <th className="px-6 py-3 text-left">Clock Out</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left rounded-r-lg">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendanceHistory?.length > 0 ? (
                    attendanceHistory.map((record, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          {record.date ? safeFormatDate(record.date, 'dd MMM yyyy') : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {record.clockIn
                            ? safeFormatDate(record.clockIn, 'HH:mm')
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {record.clockOut
                            ? safeFormatDate(record.clockOut, 'HH:mm')
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${record.status === 'Present'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-yellow-100 text-yellow-600'
                              }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {record.note || 'No notes'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-600">
                        {loading
                          ? 'Loading attendance records...'
                          : 'No records found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
