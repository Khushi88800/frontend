import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import ProfileNav from '../Navbar/ProfileNav';
import toast from 'react-hot-toast';
import { createPayroll, viewPayroll, updatePayroll, deletePayroll } from '../../redux/payrollSlice';

const PayrollSection = () => {
  const dispatch = useDispatch();
  const { bankDetails, loading } = useSelector((state) => state.payroll);

  // State for form inputs
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankIFSCode, setBankIFSCode] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(viewPayroll());
  }, [dispatch]);

  useEffect(() => {
    if (bankDetails) {
      setBankName(bankDetails.bankName);
      setBankAccount(bankDetails.bankAccount);
      setBankIFSCode(bankDetails.bankIFSCode);
      setIsEdit(true);  // Set to edit mode if bank details exist
    }
  }, [bankDetails]);

  const handleAddOrUpdateBankDetails = (e) => {
    e.preventDefault();
    if (!bankName || !bankAccount || !bankIFSCode) {
      toast.error('All fields are required');
      return;
    }

    const payload = { bankName, bankAccount, bankIFSCode };

    if (isEdit) {
      dispatch(updatePayroll(payload));
      toast.success("Bank Account Updated Successfully❤")
    } else {
      dispatch(createPayroll(payload));
      toast.success("Bank Account Created Successfully🏦")
    }
  };

  const handleDeleteBankDetails = () => {
    if (window.confirm("Are you sure you want to delete bank details?")) {
      dispatch(deletePayroll());
      toast.success("Bank Account Deleted Successfully😒");
    }
  };
  
  return (
    <div className="p-4 bg-gray-50 ">
      <ProfileNav />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-6">
        {/* Input Payroll Details Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="border-b pb-3">
            <h4 className="text-xl font-semibold">Payroll Details</h4>
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add Bank Name"
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add Bank Account Number"
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add Bank IFS Code"
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={bankIFSCode}
                onChange={(e) => setBankIFSCode(e.target.value)}
              />
            </div>

            {/* Add/Update Bank Button */}
            <div className="flex justify-end">
              <button
                className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800"
                onClick={handleAddOrUpdateBankDetails}
                disabled={loading}
              >
                {isEdit ? 'Update Bank' : 'Add Bank'}
              </button>
            </div>
          </div>
        </div>

        {/* Display Payroll Details Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="border-b pb-3">
            <h4 className="text-xl font-semibold">Payroll Details</h4>
          </div>
          <div className="space-y-4 mt-4">
            {bankDetails ? (
              <>
                <div>
                  <span className="text-purple-600">Bank Name: </span>
                  <span>{bankDetails.bankName}</span>
                </div>
                <div>
                  <span className="text-purple-600">Bank Account Number: </span>
                  <span>{bankDetails.bankAccount}</span>
                </div>
                <div>
                  <span className="text-purple-600">Bank IFS Code: </span>
                  <span>{bankDetails.bankIFSCode}</span>
                </div>
                <div>
                  <span className="text-purple-600">Bank Statement: </span>
                  <span>
                    <a href={bankDetails.bankStatement} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </span>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800"
                    onClick={() => setIsEdit(true)}  // Set to edit mode
                  >
                    <FaPencilAlt className="h-5 w-5" />
                  </button>
                  <button
                    className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800"
                    onClick={handleDeleteBankDetails} // Delete bank details
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <p>No payroll details found</p>
            )}
          </div>
        </div>

  {/* P45 Upload Card */}
 <div className="bg-white rounded-lg shadow p-4">
    <div className="border-b pb-3">
      <h4 className="text-xl font-semibold">Bank Statement</h4>
    </div>
    <div className="mt-4">
      <button className="flex items-center  text-purple-600 hover:text-purple-800">
        <FiFileText className="h-5 w-5 mr-2" />
        <span>Upload Statenent</span>
        <span className="ml-auto ">Edit</span>
      </button>
    </div>
  </div> 

  {/* Salary Card */}
   <div className="bg-white rounded-lg shadow p-4">
    <div className="border-b pb-3">
      <h4 className="text-xl font-semibold">Salary</h4>
    </div>
    <div className="mt-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Current Salary"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800">
          <FaPencilAlt className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div> 
      </div>
    </div>
  );
};

export default PayrollSection;
