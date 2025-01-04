import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewDocuments } from "../redux/documentSlice";
import ProfileNav from "../EmployeeDashboard/Navbar/ProfileNav";
function EmployeeDocuments() {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    panCard: "",
    phone: "",
    department: "",
    address: "",
    dateOfBirth: "",
    city: "",
    state: null,
    zipCode: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInput.panCard ||
      !userInput.phone ||
      !userInput.department ||
      !userInput.address ||
      !userInput.city ||
      !userInput.dateOfBirth ||
      !userInput.state ||
      !userInput.zipCode
    ) {
      toast.error("Please fill all the details");
      return;
    }
    const response = await dispatch(createNewDocuments(userInput));
    if (response?.payload?.success) {
      setUserInput({
        panCard: "",
        phone: "",
        department: "",
        address: "",
        dateOfBirth: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center  ">
      <div className="w-full lg:max-w-7xl p-4  rounded-md ">
        <ProfileNav />
        <form className="space-y-6 mt-10 " noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block font-semibold mb-1">PanCard:-</label>
              <input
                type="text"
                name="panCard"
                id="panCard"
                onChange={handleUserInput}
                value={userInput.panCard}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your Pancard"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Department</label>
              <select
                value={userInput.department}
                name="department"
                id="department"
                onChange={handleUserInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Select department"
              >
                <option selected>
                  Select Department
                </option>
                <option value="IT">IT</option>
                <option value="Development">Development</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Support">Support</option>
                <option value="Legal">Legal</option>
                <option value="Administration">Administration</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold mb-1">
              Street Address
            </label>
            <input
              value={userInput.address}
              onChange={handleUserInput}
              type="text"
              name="address"
              id="address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Street Address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={userInput.city}
                onChange={handleUserInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                State/Province
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={userInput.state}
                onChange={handleUserInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="State/Province"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Postal/Zip Code
              </label>
              <input
                name="zipCode"
                id="zipCode"
                value={userInput.zipCode}
                onChange={handleUserInput}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Postal/Zip Code"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={userInput.phone}
                onChange={handleUserInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="(+91) 000-0000"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Gaurdian Numeber   {" "}
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Gaurdian Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Gender</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={userInput.dateOfBirth}
                onChange={handleUserInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="w-full max-w-full mx-auto">
            <label className="block font-semibold mb-2">
              Please upload your photo
            </label>
            <input type="file" className="hidden" />
            <div className="border-dashed border-2 border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h16m-5 4l4-4m0 0l-4-4m4 4H3"
                />
              </svg>
              <p className="font-semibold text-gray-500">Browse Files</p>
              <p className="text-sm text-gray-400">
                Drag and drop files here
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-[22rem] bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition"
          >
            Save & Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeDocuments;