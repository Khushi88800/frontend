import React, { useState } from 'react';
import ProfileNav from '../Navbar/ProfileNav';

const HolidayDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Hardcoded 2025 Holidays Data
  const upcomingHolidays = [
    { id: 1, date: 'Mon, 26 Aug 2025', reason: 'Bank Holiday' },
    { id: 2, date: 'Thu, 25 Dec 2025', reason: 'Christmas Day' },
    { id: 3, date: 'Fri, 1 Jan 2025', reason: 'New Year\'s Day' },
    { id: 4, date: 'Fri, 15 May 2025', reason: 'Labour Day' },
    { id: 5, date: 'Mon, 17 Mar 2025', reason: 'St. Patrick\'s Day' },
    // Add more 2025 holidays here as needed
  ];

  const historyHolidays = [
    { id: 1, date: 'Tue, 1 Jan 2019', reason: "New Year's Day" },
    { id: 2, date: 'Mon, 21 Jan 2019', reason: 'Martin Luther King Jr. Day' },
    // Other history holidays can be listed here
  ];

  return (
    <div className="container mx-auto px-4  mt-4">
      <ProfileNav />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Holidays List Card */}
        <div className="w-full lg:w-1/2">
          <div className="p-6">
            <h4 className="text-xl font-semibold mb-6">Holidays List</h4>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'upcoming'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'history'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  History
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">#</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Leave Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'upcoming' ? upcomingHolidays : historyHolidays).map((holiday) => (
                    <tr key={holiday.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{holiday.id}</td>
                      <td className="py-3 px-4">{holiday.date}</td>
                      <td className="py-3 px-4">{holiday.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leave Off Details Card */}
        <div className="w-full lg:w-1/2">
          <div className="p-6">
            <h4 className="text-xl font-semibold mb-6">Leave Off Details</h4>

            <div className="space-y-6">
              <div>
                <h5 className="font-medium mb-2">Year</h5>
                <p>01 January – 31 December</p>
              </div>

              <div>
                <h5 className="font-medium mb-2">Days Used</h5>
                <span className="text-sm text-gray-600">5 days</span>
              </div>

              <div>
                <h5 className="font-medium mb-2">Days</h5>
                <p>5 Used</p>
              </div>

              <div>
                <h5 className="font-medium mb-2">Non Deductible Days</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm">
                    5 Approved
                  </span>
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm">
                    7 Pending
                  </span>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Attendance</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span>3 Sick Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>2 Working from Home</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Time Off Approvers</h5>
                {/* <Select
                  className="w-full"
                  defaultValue="Choose Approver"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayDashboard;
