import React from 'react';
import { Link } from 'react-router-dom';
import ProfileNav from '../Navbar/ProfileNav';

const EmployeeReviews = () => {
  const reviews = [
    {
      name: 'Monthly Review',
      reviewer: 'Richard Wilson',
      beginOn: '15 Dec 2019',
      dueBy: '17 Dec 2019',
      status: 'In Progress'
    },
    {
      name: 'Employees Review',
      reviewer: 'Richard Wilson',
      beginOn: '15 Dec 2019',
      dueBy: '17 Dec 2019',
      status: 'In Progress'
    }
  ];

  return (
    <div className="flex-1  ">
      {/* Breadcrumb and Title */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="space-y-2">
         <ProfileNav/>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-4">
        <div className="p-4">
          <div className="flex space-x-4">
            <Link to="/overview-reviews" className="px-4 py-2 bg-yellow-400 text-white rounded-md">Overview</Link>
            <Link to="/review-type" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Review Types</Link>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 flex justify-between items-center border-b">
          <h4 className="text-xl font-semibold text-gray-800">Reviews</h4>
          <Link to="/create-review" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Create Review
          </Link>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Begin On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{review.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                        {review.reviewer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{review.beginOn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{review.dueBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReviews;