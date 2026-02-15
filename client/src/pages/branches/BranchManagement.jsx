import React, { useState } from "react";
import {
  Plus,
  MapPin,
  Phone,
  User,
  Eye,
  Edit2,
} from "lucide-react";

const BranchesList = () => {
  const [branches] = useState([
    {
      id: 1,
      name: "Bangalore HQ",
      code: "BLR-HQ",
      manager: "Amit Singh",
      phone: "+91 9876543210",
      city: "Bangalore",
      state: "Karnataka",
      status: "active",
    },
    {
      id: 2,
      name: "Mumbai Sales",
      code: "MUM-SALES",
      manager: "Neha Gupta",
      phone: "+91 9876543222",
      city: "Mumbai",
      state: "Maharashtra",
      status: "active",
    },
    {
      id: 3,
      name: "Delhi Support",
      code: "DEL-SUP",
      manager: "Rahul Verma",
      phone: "+91 9876543333",
      city: "Delhi",
      state: "Delhi",
      status: "inactive",
    },
  ]);

  const statusStyle = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Branches
          </h1>
          <p className="text-gray-500 mt-1">
            Manage company locations and offices
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold">
          <Plus size={18} />
          Add Branch
        </button>
      </div>

      {/* Branch Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Branch
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Manager
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {branches.map((b) => (
              <tr
                key={b.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-xs text-gray-500">
                    Code: {b.code}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm flex items-center gap-2">
                  <User size={14} className="text-gray-400" />
                  {b.manager}
                </td>

                <td className="px-6 py-4 text-sm flex items-center gap-2">
                  <Phone size={14} className="text-gray-400" />
                  {b.phone}
                </td>

                <td className="px-6 py-4 text-sm flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400" />
                  {b.city}, {b.state}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyle[b.status]
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-3">
                  <button className="text-blue-600">
                    <Eye size={16} />
                  </button>
                  <button className="text-green-600">
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchesList;
