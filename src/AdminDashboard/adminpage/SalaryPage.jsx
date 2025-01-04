import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getSalaryData, createSalary } from "../../redux/salarySlice";
import { FaAmazonPay, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SalaryPage = ({ isAdmin }) => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    const handlePayment = () => {
      loadRazorpay();
      const options = {
        key: 'rzp_test_AFZoLbbTbHlOag', 
        amount: 2000000, 
        currency: 'INR',
        name: 'Varnav infotech LLP',
        description: 'Test Transaction for the employee',
        image: 'https://github.com/ashish8513/Office-Employee/blob/main/public/VN%20LOGO.jpeg', 
        handler: function (response) {
          toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Varnav infotech llp',
          email: 'officeteaminfotech@exampl.com',
          contact: '6280051429',
        },
        notes: {
          address: 'D234 second floor phase 8b industrial area sector 74',
        },
        theme: {
          color: '#155e75',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      navigate('/admin');
    }
    const salaryMethod = useSelector((state) => state.salary.salaryData);

    const [newTransaction, setNewTransaction] = useState({
        name: "",
        type: "",
        amount: "",
        date: "",
        details: "",
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const addTransaction = async (e) => {
        e.preventDefault();
        if (!newTransaction.name || !newTransaction.amount || !newTransaction.date || !newTransaction.details) {
            toast.error("Please fill out all fields");
            return;
        }
        try {
            await dispatch(createSalary(newTransaction)).unwrap();
            setNewTransaction({
                name: "",
                type: "",
                amount: "",
                date: "",
                details: "",
            });
        } catch (error) {
            toast.error(error || "Failed to add transaction");
        }
    };
    useEffect(() => {
        dispatch(getSalaryData())
            .unwrap()
            .catch((error) => {
                toast.error("Failed to fetch transactions");
                console.error(error);
            });
    }, [dispatch]);

    const totalSalary = Array.isArray(salaryMethod?.data)
        ? salaryMethod.data.reduce(
            (sum, t) => (t.type === "Credit" ? sum + Number(t.amount) : sum - Number(t.amount)),
            0
        )
        : 0;

    return (
        <div className="min-h-screen pt-20 flex flex-col items-center py-6 px-4 md:px-8 select-none">
            <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Salary Data</h1>
                <p className="text-gray-600 mt-2">
                    Total Salary:{" "}
                    <span
                        className={`font-semibold ${totalSalary >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        ₹{totalSalary}
                    </span>
                </p>
            </div>

            {/* Admin Form */}
            {isAdmin && (
                <div className="w-full max-w-4xl bg-white shadow rounded-lg mt-6 p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Transaction</h2>
                    <form onSubmit={addTransaction} className="space-y-4">
                        <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="w-full">
                                <label className="block text-gray-600 font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={newTransaction.name}
                                    onChange={handleInputChange}
                                    className="select-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-600 font-medium mb-1">Type</label>
                                <select
                                    name="type"
                                    value={newTransaction.type}
                                    onChange={handleInputChange}
                                    className="w-select-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                                    <option value="" disabled>Select Type</option>
                                    <option value="Credit">Credit</option>
                                    <option value="Debit">Debit</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="w-full">
                                <label className="block text-gray-600 font-medium mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={newTransaction.amount}
                                    onChange={handleInputChange}
                                    className="wselect-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-600 font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newTransaction.date}
                                    onChange={handleInputChange}
                                    className="select-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Details</label>
                            <input
                                type="text"
                                name="details"
                                value={newTransaction.details}
                                onChange={handleInputChange}
                                placeholder="enter details for transaction"
                                className="select-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Transaction
                        </button>
                    </form>
                </div>
            )}

            {/* Transaction List */}
            <div className="w-full max-w-4xl bg-white shadow rounded-lg mt-6 p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Transactions</h2>
                <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
                    <table className="w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                                <th className="border border-gray-200 px-4 py-2">Name</th>
                                <th className="border border-gray-200 px-4 py-2">Date</th>
                                <th className="border border-gray-200 px-4 py-2">Type</th>
                                <th className="border border-gray-200 px-4 py-2">Amount</th>
                                <th className="border border-gray-200 px-4 py-2">Details</th>
                                <th className="border border-gray-200 px-4 py-2">Pay now</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryMethod?.data && Array.isArray(salaryMethod.data) && salaryMethod.data.length > 0 ? (
                                salaryMethod.data.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="text-gray-700 text-sm hover:bg-gray-100"
                                    >
                                        <td className="border border-gray-200 px-4 py-2">{transaction.name}</td>
                                        <td className="border border-gray-200 px-4 py-2">{transaction.date}</td>
                                        <td
                                            className={`border border-gray-200 px-4 py-2 font-semibold ${transaction.type === "Credit"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {transaction.type}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            ₹{transaction.amount}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">{transaction.details}</td>

                                            <button onClick={handlePayment} className="flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition duration-200 ease-in-out">
                                                <FaAmazonPay className="text-2xl text-center" />
                                            </button>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default SalaryPage;
