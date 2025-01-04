import React, { useEffect } from "react";
import { FaList, FaPlus, FaThLarge } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserData } from "../../../redux/userSlice";

function EmployeeCard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  useEffect(() => {
    if (id) {
      dispatch(getUserData(id));
    }
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="pt-12 w-full min-h-screen ">
      <div className="bg-white shadow-sm hover:shadow-lg rounded-xl mb-4 p-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">{users.length} People Exist</h4>
          <div className="flex space-x-6 justify-center items-center p-4">
            <Link
              to="/admin/document"
              className="text-violet-800 hover:text-yellow-500 transition duration-200 ease-in-out"
            >
              <FaThLarge className="text-xl" />
            </Link>
            <Link
              to="/admin/employee-list"
              className="text-gray-700 hover:text-gray-900 transition duration-200 ease-in-out"
            >
              <FaList className="text-xl" />
            </Link>
            <Link
              to="/admin/add-employee"
              className="bg-violet-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-violet-900 transition duration-200 ease-in-out flex items-center space-x-2"
            >
              <FaPlus className="text-sm" />
              <span>Add Person</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {users.length === 0 ? (
          <div className="text-center text-gray-500">No users available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center">
                    <Link to="/employees/profile" className="mb-4">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                          src={user?.avatar?.secure_url}
                          alt={user.fullName || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="text-center">
                      <Link
                        to="/employees/profile"
                        className="text-purple-600 hover:text-purple-700 text-lg font-semibold mb-1 uppercase"
                      >
                        {user.fullName || "Unnamed User"}
                      </Link>
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-800">
                          {user.role || "No Role Assigned"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {user.email || "No Email Provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeCard;

// <div className="overflow-x-auto w-full bg-white shadow-lg rounded-lg">

//     {loading ? (
//         <div className="text-center text-cyan-700 font-semibold">Loading documents...</div>
//     ) : (
//         <div className="overflow-x-auto w-full bg-white shadow-lg rounded-lg">
//             <table className="w-full border-collapse border border-gray-200 text-sm">
//                 <thead>
//                     <tr className="bg-cyan-700 text-white uppercase text-sm">
//                         {/* <th className="border border-gray-200 px-4 py-2">Name</th> */}
//                         <th className="border border-gray-200 px-4 py-2">Pancard</th>
//                         <th className="border border-gray-200 px-4 py-2">Phone</th>
//                         <th className="border border-gray-200 px-4 py-2">Address</th>
//                         <th className="border border-gray-200 px-4 py-2">Date of Birth</th>
//                         <th className="border border-gray-200 px-4 py-2">City</th>
//                         <th className="border border-gray-200 px-4 py-2">State</th>
//                         <th className="border border-gray-200 px-4 py-2">Zip Code</th>
//                         <th className="border border-gray-200 px-4 py-2">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {documents.length > 0 ? (
//                         documents.map((document) => (
//                             <tr
//                                 key={document.id}
//                                 className="text-gray-700 text-sm hover:bg-gray-100"
//                             >
//                                 {/* <td className="border border-gray-200 px-4 py-2">{document.name}</td> */}
//                                 <td className="border border-gray-200 px-4 py-2">{document.panCard}</td>
//                                 <td className="border border-gray-200 px-4 py-2">{document.phone}</td>
//                                 <td className="border border-gray-200 px-4 py-2">{document.address}</td>
//                                 <td className="border border-gray-200 px-4 py-2">{document.dateOfBirth}</td>
//                                 <td className="border border-gray-200 px-4 py-2">{document.city}</td>
//                                 <td className="border border-gray-200 px-4 py-2">{document.state}</td>
//                                 <td className="border border-gray-200 px-4 py-2">{document.zipCode}</td>
//                                 <td className="border border-gray-200 px-4 py-2 text-center">
//                                     <button
//                                         onClick={handleDelete}
//                                         className="text-red-600 hover:text-red-800 font-semibold"
//                                     >
//                                         <FaTrashAlt />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td
//                                 colSpan="9"
//                                 className="text-center text-gray-500 py-4"
//                             >
//                                 No documents found.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     )}
// </div>