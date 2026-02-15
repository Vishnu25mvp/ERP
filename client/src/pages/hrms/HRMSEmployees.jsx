import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Mail,
  Phone,
}
from 'lucide-react';

const HRMSEmployees = () => {
  const [employees] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@company.com',
      phone: '+91 9876543210',
      position: 'Sales Manager',
      department: 'Sales',
      hireDate: '2023-06-15',
      branch: 'Main Office',
      status: 'active',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@company.com',
      phone: '+91 9876543211',
      position: 'Account Executive',
      department: 'Sales',
      hireDate: '2024-01-10',
      branch: 'Main Office',
      status: 'active',
    },
    {
      id: 3,
      name: 'Meera Singh',
      email: 'meera@company.com',
      phone: '+91 9876543212',
      position: 'Accountant',
      department: 'Finance',
      hireDate: '2023-12-01',
      branch: 'Branch Office',
      status: 'active',
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departmentColors = {
    Sales: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Finance: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    HR: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Operations: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Directory</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage company employees</p>
        </div>
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Employees</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{employees.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {employees.filter(e => e.status === 'active').length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Departments</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">4</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Branches</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Position</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Branch</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Hire Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{emp.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{emp.position}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${departmentColors[emp.department] || 'bg-gray-100'}`}>
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin size={14} className="inline mr-1" />
                    {emp.branch}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{emp.hireDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex gap-2">
                      <Mail size={14} />
                      <Phone size={14} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedEmployee(emp)} className="text-blue-600">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600">
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedEmployee.name}</h2>
              <button onClick={() => setSelectedEmployee(null)} className="text-gray-500">✕</button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Position</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedEmployee.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedEmployee.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                    View Attendance
                  </button>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                    Leave Requests
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                    Payroll Info
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRMSEmployees;
