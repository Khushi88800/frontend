import React from 'react'
import ProfileNav from '../Navbar/ProfileNav'
import { useSelector } from 'react-redux';

function EmployeeDetails() {
  const userData = useSelector((state) => state?.auth?.data);

  const [firstName, lastName] = userData?.fullName?.split(' ') || ['Ashish', 'Prabhakar'];
  return (
    <div>
      <div className="p-4 bg-gray-50 ">
        <ProfileNav />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* Basic Information Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
            <div className="space-y-3 text-xl font-semibold">
              <div>
                <span className="text-purple-600">Preferred Name: </span>
                <span className="font-bold capitalize">{userData?.fullName}</span>
              </div>
              <div>
                <span className="text-purple-600">First Name: </span>
                <span className='capitalize'>{firstName}</span>
              </div>
              <div>
                <span className="text-purple-600">Last Name: </span>
                <span className='capitalize'>{lastName}</span>
              </div>
              <div>
                <span className="text-purple-600">role: </span>
                <span>{userData.role}</span>
              </div>
              <div>
                <span className="text-purple-600">Date of Birth: </span>
                <span>05 May 1990</span>
              </div>
              <div>
                <span className="text-purple-600">Gender: </span>
                <span>Female</span>
              </div>

              <div className="flex gap-2">
                <button className="bg-purple-700 text-white p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="bg-purple-700 text-white p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-lg shadow p-4 font-semibold">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contact</h2>
            <div className="space-y-3">
              <div>
                <span className="text-purple-600">Phone Number: </span>
                <span>987654321</span>
              </div>
              <div>
                <span className="text-purple-600">Personal Email: </span>
                <span>{userData.email}</span>
              </div>
              <div>
                <span className="text-purple-600">Secondary Number: </span>
                <span>986754231</span>
              </div>
              <div>
                <span className="text-purple-600">Web Site: </span>
                <span>www.focustechnology.com</span>
              </div>
              <div>
                <span className="text-purple-600">LinkedIn: </span>
                <span>#mariacotton</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-purple-700 text-white p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="bg-purple-700 text-white p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Dates Section */}
          <div className="space-y-4">
            {/* Current Dates Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Dates</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-purple-600">Start Date: </span>
                  <span>{new Date(userData.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-purple-600">Date: </span>
                  <span>{new Date(userData.updatedAt).toDateString()}</span>
                </div>
                <button className="bg-purple-700 text-white p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add New Dates Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-semibold">Dates</h2>
                <button className="text-purple-600 hover:text-purple-800">New Type</button>
              </div>
              <div className="space-y-4">
                <div>
                  <input type="date" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
                <div>
                  <input type="date" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
                <button className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800">
                  Add A Key Date
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails