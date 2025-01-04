import React, { useEffect, useState } from 'react';
import { CreateEmployee, UpdateEmployeeById } from '../../Helpers/api';
import toast from 'react-hot-toast';

function AddEmployee({ showModal, setShowModal, fetchEmployees, employeeObj }) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
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
        const isEmpty = Object.values(employee).some((value) => value.trim() === '');
        if (isEmpty) {
            toast.error('All fields are required');
            return;
        }
        // console.log('API Response:', { success, message });

        try {
            const { success, message } = updateMode
                ? await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);
            if (success) {
                toast.success(updateMode ? 'Employee updated successfully' : 'Employee added successfully');
            } else {
                toast.error(message || 'Error creating employee');
            }
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to create employee",err)
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
                showModal ? 'block' : 'hidden'
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h5 className="text-xl font-semibold">
                        {updateMode ? 'Update Employee' : 'Add Employee'}
                    </h5>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={handleModalClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <form noValidate onSubmit={handleAddEmployee} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
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
            </div>
        </div>
    );
}

export default AddEmployee;