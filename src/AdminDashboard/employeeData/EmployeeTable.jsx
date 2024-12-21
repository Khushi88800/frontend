import React from "react";
import { Link } from "react-router-dom";
import { DeleteEmployeeById } from "../../Helpers/api";
import { FaEdit, FaTrashAlt, FaFileExcel, FaPrint } from "react-icons/fa"; // Import React icons
import * as XLSX from "xlsx"; // Import xlsx library
import toast from "react-hot-toast";

function EmployeeTable({
  employees = [],
  pagination = { currentPage: 1, totalPages: 1 },
  fetchEmployees,
  handleUpdateEmployee,
}) {
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];
  const { currentPage, totalPages } = pagination;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (page) => {
    fetchEmployees("", page, 5);
  };

  const handleDeleteEmployee = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!isConfirmed) {
      return; // If user selects "No", exit the function.
    }

    try {
      await DeleteEmployeeById(id);
      toast.success("Employee deleted successfully");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete Employee", "error");
    }
  };

  const TableRow = ({ employee }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2 px-4">
        <Link
          to={`/employee/${employee._id}`}
          className="text-black hover:underline"
        >
          {employee.name}
        </Link>
      </td>
      <td className="py-2 px-4">{employee.email}</td>
      <td className="py-2 px-4">{employee.phone}</td>
      <td className="py-2 px-4">{employee.department}</td>
      <td className="py-2 px-4 flex gap-2">
        <i
          className="text-yellow-500 cursor-pointer"
          title="Edit"
          onClick={() => handleUpdateEmployee(employee)}
        >
          <FaEdit /> {/* Edit Icon */}
        </i>
        <i
          className="text-red-500 cursor-pointer"
          title="Delete"
          onClick={() => handleDeleteEmployee(employee._id)}
        >
          <FaTrashAlt /> {/* Delete Icon */}
        </i>
      </td>
    </tr>
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Function to export data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(employees);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employee Data");
    XLSX.writeFile(wb, "EmployeeData.xlsx");
  };

  // Function to handle print
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(
      "<html><head><title>Employee Data</title></head><body>"
    );
    printWindow.document.write("<h1>Employee Data</h1>");
    printWindow.document.write(document.querySelector("table").outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="w-full overflow-y-auto md:mb-4">
      <div className="flex float-right text-green-600 space-x-3 cursor-pointer text-2xl mb-4">
        <FaFileExcel onClick={exportToExcel} /> {/* Excel Icon */}
        <FaPrint className="text-blue-600" onClick={handlePrint} />{" "}
        {/* Print Icon */}
      </div>

      <table className="min-w-full  table-auto border-collapse bg-white border border-gray-200">
        <thead className="">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="py-2 px-4 text-left text-gray-700 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="py-4 px-4 text-center text-gray-500"
              >
                Data Not Found
              </td>
            </tr>
          ) : (
            employees.map((emp) => <TableRow employee={emp} key={emp._id} />)
          )}
        </tbody>
      </table>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border border-gray-300 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;