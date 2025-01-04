import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CreateEmployee, UpdateEmployeeById } from '../../../Helpers/api';
import toast from 'react-hot-toast';

const EmployeeForm = ({ employeeObj }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    salary: '',
  });
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    console.log("employeeObj:", employeeObj);
    if (employeeObj) {
      setEmployee(employeeObj);
      setUpdateMode(true);
    }
  }, [employeeObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const resetEmployeeStates = () => {
    setEmployee({
      name: '',
      email: '',
      phone: '',
      department: '',
      salary: '',
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    console.log("Employee State Before Validation:", employee);
    
    const isEmpty = Object.values(employee).some((value) => value.trim() === '');
    if (isEmpty) {
      toast.error('All fields are required');
      return;
    }
    
    try {
      const { success, message } = updateMode
        ? await UpdateEmployeeById(employee, employee._id)
        : await CreateEmployee(employee);
      if (success) {
        toast.success(updateMode ? 'Employee updated successfully' : 'Employee added successfully');
      } else {
        toast.error(message || 'Error creating employee');
      }
    
      resetEmployeeStates();
    
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create employee", err.message || err);
    }
  };
  

  const [openSection, setOpenSection] = useState('basic');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const AccordionHeader = ({ title, subtitle, section }) => (
    <div
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
      onClick={() => toggleSection(section)}
    >
      <div>
        <h4 className="text-lg font-medium text-gray-900">{title}</h4>
        <span className="text-sm text-gray-500">{subtitle}</span>
      </div>
      {openSection === section ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
    </div>
  );

  return (
    <div className="max-h-screen bg-gray-50 py-8 mt-40">
      <div className="max-w-7xl md:ml-40">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Main content */}
          <div className="lg:w-5/6">
            <div className="bg-white rounded-lg shadow divide-y">
              {/* Basic Details */}
              <div>
                <AccordionHeader
                  title="Basic Details"
                  subtitle="Organized and secure."
                  section="basic"
                />
                {openSection === 'basic' && (
                  <div className="p-4">
                    <form noValidate onSubmit={handleAddEmployee} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                          name="name"
                          value={employee.name}    
                          onChange={(e) => {
                            console.log("Name Input:", e.target.value);
                            handleChange(e);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                          name="email"
                          value={employee.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                          name="phone"
                          value={employee.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                          name="department"
                          value={employee.department}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                          name="salary"
                          value={employee.salary}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                      >
                        {updateMode ? 'Update' : 'Save'}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Employment Details */}
              <div>
                <AccordionHeader
                  title="Employment Details"
                  subtitle="Let everyone know the essentials so they're fully prepared."
                  section="employment"
                />
                {openSection === 'employment' && (
                  <div className="p-4">
                    <form className="space-y-4">
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Country of Employment</option>
                      </select>
                      <input
                        type="date"
                        placeholder="Start Date"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Job Title"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Employment Type</p>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="employment_type" className="text-blue-600" defaultChecked />
                            <span className="text-sm text-gray-700">Permanent</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="employment_type" className="text-blue-600" />
                            <span className="text-sm text-gray-700">Freelancer</span>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Teams and Offices */}
              <div>
                <AccordionHeader
                  title="Teams and Offices"
                  subtitle="Keep things tidy — and save time setting approvers and public holidays."
                  section="teams"
                />
                {openSection === 'teams' && (
                  <div className="p-4">
                    <form className="space-y-4">
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Team</option>
                      </select>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Line Manager</option>
                      </select>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Office</option>
                      </select>
                    </form>
                  </div>
                )}
              </div>

              {/* Salary Details */}
              <div>
                <AccordionHeader
                  title="Salary Details"
                  subtitle="Stored securely, only visible to Super Admins, Payroll Admins, and themselves."
                  section="salary"
                />
                {openSection === 'salary' && (
                  <div className="p-4">
                    <form className="space-y-4">
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Currency</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Amount"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Frequency</option>
                      </select>
                      <input
                        type="date"
                        placeholder="Start Date"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className=" gradient-bg hover-gradient  px-6 shadow-lg text-lg transition-transform duration-300px-6 py-2  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;