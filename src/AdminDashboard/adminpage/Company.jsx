import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCompany } from "../../redux/companySlice";
import toast from "react-hot-toast";
const Company = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Leave & Attendance Policy",
      type: "PDF",
      date: "05 Jan 2019",
      size: "20 MB",
    },
    {
      id: 2,
      name: "Dress Code Policy",
      type: "PDF",
      date: "10 May 2019",
      size: "30 MB",
    },
    {
      id: 3,
      name: "ID Card Policy",
      type: "Word",
      date: "12 Jun 2019",
      size: "25 MB",
    },
    {
      id: 4,
      name: "Work From Home Policy",
      type: "Word",
      date: "05 Jul 2019",
      size: "10 MB",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "",
    date: "",
    size: "",
  });
  const [companyData, setCompanyData] = useState({
    Companyname: "",
    registerNumber: "",
    incorporationDate: "",
    vatNumber: "",
    address: "",
  });

  const dispatch = useDispatch();

  const handleAddDocument = () => {
    if (newDocument.name) {
      setDocuments([...documents, { id: documents.length + 1, ...newDocument }]);
      setShowModal(false);
      setNewDocument({ name: "", type: "", date: "", size: "" });
    }
  };

  const handleAddCompany = () => {
    if (companyData.name) {
      toast.success("company added successfully", companyData.name)
      dispatch(createCompany(companyData));
      
      setShowModal(false);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:pt-1 pt-16">
      {/* Company Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{companyData.name || "Varnav Infotch LLP"}</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => openModal("Add New Document")}
          >
          Add Company
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Register Number:</p>
            <p>{companyData.registerNumber || "7215181541"}</p>
          </div>
          <div>
            <p className="text-gray-600">Incorporation Date:</p>
            <p>{companyData.incorporationDate || "13-06-2024"}</p>
          </div>
          <div>
            <p className="text-gray-600">VAT Number:</p>
            <p>{companyData.vatNumber || "Not specified"}</p>
          </div>
          <div>
            <p className="text-gray-600">Address:</p>
            <p>{companyData.address || "D 234 sector 74 mohali "}</p>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Documents</h3>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => openModal("addDocument")}
          >
            Add Document
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="p-2 border">{doc.name}</td>
                  <td className="p-2 border">{doc.type}</td>
                  <td className="p-2 border">{doc.date}</td>
                  <td className="p-2 border">{doc.size}</td>
                  <td className="p-2 border text-center">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() =>
                        setDocuments(documents.filter((d) => d.id !== doc.id))
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalType === "editCompany" ? "Update Company" : "Add New Document"}
            </h2>
            {modalType === "Add New Document" ? (
              <>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={companyData.name}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Register Number"
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={companyData.registerNumber}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      registerNumber: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  placeholder="Incorporation Date"
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={companyData.incorporationDate}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      incorporationDate: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="VAT Number"
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={companyData.vatNumber}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, vatNumber: e.target.value })
                  }
                />
                <textarea
                  placeholder="Address"
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={companyData.address}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, address: e.target.value })
                  }
                />
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleAddCompany}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Document Name"
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={newDocument.name}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, name: e.target.value })
                  }
                />
                <select
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={newDocument.type}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, type: e.target.value })
                  }
                >
                  <option value="">Select Type</option>
                  <option value="PDF">PDF</option>
                  <option value="Word">Word</option>
                </select>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={newDocument.date}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, date: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Size (e.g., 20 MB)"
                  className="w-full border rounded-md px-3 py-2 mb-4"
                  value={newDocument.size}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, size: e.target.value })
                  }
                />
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleAddDocument}
                  >
                    Add
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;