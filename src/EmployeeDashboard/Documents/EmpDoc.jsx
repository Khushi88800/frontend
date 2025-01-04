import React, { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import ProfileNav from '../Navbar/ProfileNav';

const DocumentManagement = () => {
  const [selectedModal, setSelectedModal] = useState(null);
  
  const documents = [
    { id: 1, title: 'Passport', filename: 'Passport.pdf' },
    { id: 2, title: 'P45', filename: 'P45.pdf' },
    { id: 3, title: 'Visa', filename: 'Visa.pdf' }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm  ">
      {/* Header */}
      <ProfileNav/>
      <div className="flex justify-between items-center mb-6 pt-6">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-gray-900">Profile</span>
          </div>
          <h1 className="text-2xl font-semibold">Documents</h1>
        </div>
        <button 
          onClick={() => setSelectedModal('add')}
          className="text-purple-600 hover:text-purple-700"
        >
          Add Document
        </button>
      </div>

      {/* Document Cards */}
      <div className="space-y-4">
        {documents.map(doc => (
          <div key={doc.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-purple-600">{doc.title}</h2>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <div className="flex items-center space-x-2">
                {/* <FileText className="text-purple-600" size={20} /> */}
                <FiFileText />
                <span className="text-gray-600">{doc.filename}</span>
              </div>
              <button 
                onClick={() => setSelectedModal(`edit-${doc.id}`)}
                className="text-purple-600 hover:text-purple-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Document Button */}
      <div className="mt-6 text-center">
        <button 
          onClick={() => setSelectedModal('add')}
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
        >
          Add New Document
        </button>
      </div>

      {/* Modal */}
      {selectedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {selectedModal === 'add' ? 'Add Document' : 'Edit Document'}
              </h3>
              <button 
                onClick={() => setSelectedModal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                {/* <X size={20} /> */}
                <IoMdClose size={20} />

              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <input 
                  type="text"
                  placeholder="Document Description"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <input 
                  type="file"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setSelectedModal(null)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  {selectedModal === 'add' ? 'Add Document' : 'Save Document'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;