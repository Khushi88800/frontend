import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetEmployeeDetailsById } from '../../Helpers/api';
import { useSelector } from 'react-redux';

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const userData = useSelector((state) => state?.auth?.data);
    const fetchEmployeeDetails = async () => {
        try {
            const data = await GetEmployeeDetailsById(id);
            setEmployee(data);
        } catch (err) {
            console.error('Error fetching employee details:', err);
        }
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);

    if (!employee) {
        return <div className="text-center text-lg font-bold mt-10">Employee not found</div>;
    }

    return (
        <div className="container mx-auto mt-10 p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Employee Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex justify-center">
                        <img
                            // src={employee.profileImage || '/default-profile.png'} // Fallback image
                            src={userData?.avatar?.secure_url}
                            alt={employee.name}
                            className="rounded-lg w-full max-w-xs object-cover"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <h4 className="text-xl font-semibold text-gray-800">{employee.name}</h4>
                        <p className="mt-2 text-gray-600">
                            <strong>Email:</strong> {employee.email}
                        </p>
                        <p className="mt-2 text-gray-600">
                            <strong>Phone:</strong> {employee.phone}
                        </p>
                        <p className="mt-2 text-gray-600">
                            <strong>Department:</strong> {employee.department}
                        </p>
                        <p className="mt-2 text-gray-600">
                            <strong>Salary:</strong> {employee.salary}
                        </p>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => navigate('/admin')}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;