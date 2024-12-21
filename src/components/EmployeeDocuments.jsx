import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function EmployeeDocuments() {
    const [activeSection, setActiveSection] = useState('Documents');
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);
    const userData = useSelector((state) => state?.auth?.data);
    const handleFrontUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setFrontPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleBackUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setBackPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };
    const renderSection = () => {
        switch (activeSection) {
            case 'Documents':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>
                        <tr className='w-full'>
                            {/* resume */}
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                Resume <span className="text-red-600">*</span>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf"
                                    className="w-full p-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                />
                          
                            </td>


                        </tr>
                        <tr>
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                Aadhar Front Side <span className="text-red-600">*</span>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                                <input
                                    type="file"
                                    id="aadharFront"
                                    name="aadharFront"
                                    accept=".jpg, .jpeg, .png, .webp"
                                    onChange={handleFrontUpload}
                                    className="w-full p-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                />
                                {frontPreview && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Front Side Preview:</p>
                                        <img src={frontPreview} alt="Aadhar Front" className="w-42 h-32 object-cover rounded-lg" />
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                Aadhar Back Side <span className="text-red-600">*</span>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                                <input
                                    type="file"
                                    id="aadharBack"
                                    name="aadharBack"
                                    accept=".jpg, .jpeg, .png, .webp"
                                    onChange={handleBackUpload}
                                    className="w-full p-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                />
                                {backPreview && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Back Side Preview:</p>
                                        <img src={backPreview} alt="Aadhar Back" className="w-42 h-32 object-cover rounded-lg" />
                                    </div>
                                )}
                            </td>
                        </tr>
                    </div>
                );
            case 'Personal Info':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div>
                                    
                                    <label className="block font-semibold mb-1">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block font-semibold mb-1">Street Address</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Street Address"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Street Address Line 2</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Street Address Line 2"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">City</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">State/Province</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="State/Province"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Postal/Zip Code</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Postal/Zip Code"
                                    />
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="(+91) 000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Gaurdian Contact Number </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="(+91) 000-0000"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="name@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>

                            <div className="w-full max-w-full mx-auto">
                                <label className="block font-semibold mb-2">Please upload your photo</label>
                                    <input
                                        type="file"
                                        className="hidden"
                                    />
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
                                    <p className="text-sm text-gray-400">Drag and drop files here</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-[22rem] bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition"
                            >
                                Save & Next
                            </button>
                        </form>
                    </div>
                );
            case 'Contact Info':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <form className="space-y-4">
                            {/* Add form fields for contact info */}
                        </form>
                    </div>
                );
            default:
                return <div>Invalid Section</div>;
        }
    };

    return (
        <div className="flex min-h-screen min-w-full md:mr-48">
            {/* Sidebar */}
            <div className="w-64 bg-cyan-700 text-white flex flex-col space-y-4 p-6">
                <div className="flex items-center space-x-4">
                    <img
                        src={userData?.avatar?.secure_url || "/usertwo.png"}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full"
                    />
                    <h1 className="text-md font-semibold">hi, {userData?.fullName}</h1>
                </div>

                <button
                    onClick={() => setActiveSection('Documents')}
                    className={`p-2 text-left rounded-md ${activeSection === 'Documents' ? 'bg-cyan-500' : 'hover:bg-cyan-600'
                        }`}
                >
                    Documents
                </button>
                <button
                    onClick={() => setActiveSection('Personal Info')}
                    className={`p-2 text-left rounded-md ${activeSection === 'Personal Info' ? 'bg-cyan-500' : 'hover:bg-cyan-600'
                        }`}
                >
                    Personal Info
                </button>
                <button
                    onClick={() => setActiveSection('Contact Info')}
                    className={`p-2 text-left rounded-md ${activeSection === 'Contact Info' ? 'bg-cyan-500' : 'hover:bg-cyan-600'
                        }`}
                >
                    Contact Info
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">{renderSection()}</div>
        </div>
    );
}

export default EmployeeDocuments;