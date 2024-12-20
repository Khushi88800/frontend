import React, { useState } from 'react'
import Layout from '../Layout/Layout';

function EmployeeDocuments() {
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);

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
    return (
        <Layout>

        <div className="w-full h-screen md:p-40 bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <form className="w-full max-w-screen-lg mx-auto ">
                <h3 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    Employee Documentation
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Field
                                </th>
                                <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Input
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                            <tr>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                    Resume
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                                    <input
                                        type="file"
                                        accept=".pdf, image/*, .doc, .docx, .odt, .txt"
                                        id="resume"
                                        name="resume"
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
                            <tr>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                    Pan Card <span className="text-red-600">*</span>
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                                    <input
                                        type="text"
                                        id="pancard"
                                        name="pancard"
                                        placeholder="Enter your Pan Card number"
                                        className="w-full p-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                    Highest Qualification <span className="text-red-600">*</span>
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                                    <input
                                        type="text"
                                        id="qualification"
                                        name="qualification"
                                        placeholder="Enter your qualification"
                                        className="w-full p-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                    Bank Statement
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                                    <input
                                        type="file"
                                        id="statement"
                                        name="statement"
                                        accept=".jpg, .jpeg, .png, .pdf, .msdocs"
                                        className="w-full p-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit Data
                </button>
            </form>
        </div>
        </Layout>



    )
}

export default EmployeeDocuments;