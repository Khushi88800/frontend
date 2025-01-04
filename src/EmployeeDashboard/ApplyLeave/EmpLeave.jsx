import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createLeaveApplication } from "../../redux/LeaveApplicationSlice";

export default function LeaveApplicationForm() {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    isHalfDay: false,
    halfDayType: "",
    reason: "",
  });

  const [numberOfDays, setNumberOfDays] = useState(0);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Recalculate leave days when dates change
    if (name === "fromDate" || name === "toDate") {
      const from = new Date(name === "fromDate" ? value : formData.fromDate);
      const to = new Date(name === "toDate" ? value : formData.toDate);

      if (!isNaN(from) && !isNaN(to) && from <= to) {
        const days = (to - from) / (1000 * 60 * 60 * 24) + 1; // Calculate inclusive days
        setNumberOfDays(days);
      } else {
        setNumberOfDays(0);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.leaveType || !formData.fromDate || !formData.toDate) {
      toast.error("Please fill all required fields.");
      return;
    }

    const leaveData = {
      ...formData,
      numberOfDays,
    };

    dispatch(createLeaveApplication(leaveData));
  };

  return (
    <div className=" pt-10  px-4 sm:px-6 lg:px-8 py-8 ">
      <div className=" bg-white rounded-lg shadow-lg ">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h4 className="text-xl font-semibold text-gray-800">Apply Leaves</h4>
        </div>

        {/* Form */}
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Leave Type and Remaining Leaves */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="leaveType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                >
                  <option value="Other" disabled>
                    Select Leave Type
                  </option>
                  <option value="Sick ">Sick Leave</option>
                  <option value="Annual ">Casual Leave</option>
                  <option value="Personal ">Paid Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remaining Leaves
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                  value="10" // Hardcoded for now, replace with dynamic data
                  disabled
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <input
                  type="date"
                  name="fromDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="date"
                  name="toDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  value={formData.toDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Half Day and Number of Days */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Half Day or Full Day */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="isHalfDay"
                    value={formData.isHalfDay ? "Half Day" : "Full Day"}
                    onChange={(e) =>
                      handleInputChange({
                        target: {
                          name: "isHalfDay",
                          value: e.target.value === "Half Day",
                        },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Full Day">Full Day</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>

                {/* Half Day Type */}
                {formData.isHalfDay && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Half Day Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="halfDayType"
                      value={formData.halfDayType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="" disabled>
                        Select Half Day Type
                      </option>
                      <option value="First Half">First Half</option>
                      <option value="Second Half">Second Half</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Days Leave
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                  value={numberOfDays}
                  disabled
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason
              </label>
              <textarea
                name="reason"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                value={formData.reason}
                onChange={handleInputChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                // disabled={loading}
              >
                {/* {loading ? "Applying..." : "Apply"} */}
                Apply
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>

            {/* Error Message */}
            {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
          </form>
        </div>
      </div>


    </div>
  );
}