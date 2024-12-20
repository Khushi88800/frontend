import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../redux/employeeSlice';
import { BsPersonCircle } from 'react-icons/bs';

function CreateEmployee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('');
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
    });
    const [updateMode, setUpdateMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const resetForm = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
        });
        setPreviewImage('');
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const actionResult = await dispatch(createEmployee(employee));

            if (createEmployee.fulfilled.match(actionResult)) {
                resetForm(); // Reset form after successful creation
                navigate('/admin');
            } else {
                console.error('Failed to create employee:', actionResult.payload);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const getImage = (event) => {
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            setEmployee({
                ...employee,
                avatar: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            });
        }
    };

    return (
        <div className="w-full mx-auto p-6 space-y-6">
            <h1 className="text-center text-3xl font-bold select-none md:mb-20">
                Create Employee Data
            </h1>
            <form
                className="space-y-4 flex flex-col md:flex-row"
                onSubmit={handleAddEmployee}
            >
                {/* Left Side: Profile Image */}
                <div className="flex flex-col items-center md:w-1/2 space-y-4">
                    <label className="cursor-pointer" htmlFor="image_uploads">
                        {previewImage ? (
                            <img
                                className="w-48 h-40 rounded-md m-auto"
                                src={previewImage}
                                alt="preview"
                            />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png"
                    />
                </div>

                {/* Right Side: Employee Data */}
                <div className="flex flex-col space-y-4 md:w-1/2">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-lg font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="form-input p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-lg font-medium">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="form-input p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="form-label font-medium">Phone</label>
                        <input
                            type="text"
                            className="form-input p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="phone"
                            value={employee.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="department" className="text-lg font-medium">
                            Department
                        </label>
                        <input
                            type="text"
                            id="department"
                            className="form-input p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="salary" className="text-lg font-medium">
                            Salary
                        </label>
                        <input
                            type="text"
                            id="salary"
                            className="form-input p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {updateMode ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateEmployee;
