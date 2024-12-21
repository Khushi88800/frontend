import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from '../employeeData/CreateEmployee';
import { GetAllEmployees } from '../../Helpers/api';

const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null);
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0,
        },
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        try {
            const data = await GetAllEmployees(search, page, limit);
            setEmployeesData(data);
        } catch (err) {
            console.error('Error fetching employees:', err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearch = (e) => {
        fetchEmployees(e.target.value);
    };

    const handleUpdateEmployee = (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full p-4">
            <h1 className="text-2xl font-bold mb-6">Employee Management App</h1>
            <div className="w-full flex justify-center">
                <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            onClick={() => setShowModal(true)}
                        >
                            Add
                        </button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Employees..."
                            className="mt-3 sm:mt-0 sm:ml-4 w-full sm:w-1/2 p-2 border rounded-lg"
                        />
                    </div>
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
            </div>
        </div>
    );
};

export default EmployeeManagementApp;