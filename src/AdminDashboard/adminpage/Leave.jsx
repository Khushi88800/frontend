import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLeaveApplications,
  updateLeaveStatus,
} from "../../redux/LeaveApplicationSlice";
import toast from "react-hot-toast";

const Leave = () => {
  const dispatch = useDispatch();
  const { leaves } = useSelector((state) => state?.leave);
  const role = useSelector((state) => state?.auth?.role);
  const userData = useSelector((state) => state?.auth?.data);
  // console.log("ashish", leaves);

  useEffect(() => {
    dispatch(getAllLeaveApplications());
  }, [dispatch]);
  // Calculate summary statistics from the API data
  const leaveDetails = {
    date: new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    totalEmployees: leaves?.length || 0,
    workingFromHome:
      leaves?.filter(
        (leave) => leave.leaveType?.toLowerCase() === "working from home"
      ).length || 0,
    absent:
      leaves?.filter((leave) =>
        ["sick leave", "parental leave"].includes(
          leave.leaveType?.toLowerCase().trim()
        )
      ).length || 0,
    todayAways:
      leaves?.filter((leave) => {
        const today = new Date().toISOString().split("T")[0];
        const leaveDate = new Date(leave.from);
        return (
          !isNaN(leaveDate) && leaveDate.toISOString().split("T")[0] === today
        );
      }).length || 0,
  };

  const handleStatusChange = (leaveId, status) => {
    dispatch(updateLeaveStatus({ leaveId, status }))
      .unwrap()
      .then((data) => {
        toast.success(data.message); // Optional success message
      })
      .catch((error) => {
        console.error("Error updating leave status:", error);
      });
  };
  return (
    <div className="min-h-screen pt-20 ">
      <div className="max-w-7xl mx-auto space-y-6 ">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Leave Management Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">{leaveDetails.date}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Employees"
            value={leaveDetails.totalEmployees}
          />
          <SummaryCard
            title="Working From Home"
            value={leaveDetails.workingFromHome}
          />
          <SummaryCard title="Absent" value={leaveDetails.absent} />
          <SummaryCard title="Today Aways" value={leaveDetails.todayAways} />
        </div>

        {/* Leave Details Table */}
        <div className="bg-white text-black rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Today's Leaves
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Employee</TableHeader>
                  <TableHeader>Leave Type</TableHeader>
                  <TableHeader>From</TableHeader>
                  <TableHeader>To</TableHeader>
                  <TableHeader>Days</TableHeader>
                  <TableHeader>Remaining Days</TableHeader>
                  <TableHeader>Notes</TableHeader>
                  <TableHeader>Status</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-20 uppercase text-slate-900">
                {leaves?.map((leave, index) => (
                  <tr key={leave._id || index}>
                    <TableCell>
                      {leave?.employee?._id === userData?._id
                        ? "You (Requesting Employee)"
                        : leave?.employee?.fullName ||
                          userData.fullName ||
                          "N/A"}
                    </TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>
                      {new Date(leave.fromDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(leave.toDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{leave?.numberOfDays}</TableCell>
                    <TableCell>{leave.halfDayType}</TableCell>
                    <TableCell>{leave.notes || leave.reason}</TableCell>
                    <TableCell>
                      {role === "ADMIN" ? (
                        <select
                          value={leave.status}
                          onChange={(e) =>
                            handleStatusChange(leave._id, e.target.value)
                          }
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            leave.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : leave.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <option
                            value="Approved"
                            className="bg-green-100 text-green-800"
                          >
                            Approved
                          </option>
                          <option
                            value="Pending"
                            className="bg-yellow-100 text-yellow-800"
                          >
                            Pending
                          </option>
                          <option
                            value="Rejected"
                            className="bg-red-100 text-red-800"
                          >
                            Rejected
                          </option>
                        </select>
                      ) : (
                        <button
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            leave.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : leave.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {leave.status}
                        </button>
                      )}
                    </TableCell>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SummaryCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
  </div>
);

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    {children}
  </td>
);

export default Leave;