import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

const Invoicing = () => {
  const [invoices] = useState([
    {
      id: 'INV-001',
      customerName: 'Rajesh Kumar',
      amount: 150000,
      date: '2024-01-25',
      dueDate: '2024-02-25',
      status: 'paid',
      type: 'Tax Invoice',
    },
    {
      id: 'INV-002',
      customerName: 'Priya Sharma',
      amount: 75000,
      date: '2024-01-20',
      dueDate: '2024-02-20',
      status: 'pending',
      type: 'Proforma Invoice',
    },
    {
      id: 'INV-003',
      customerName: 'Vikram Patel',
      amount: 30000,
      date: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'overdue',
      type: 'Tax Invoice',
    },
  ]);

  const statusColors = {
    paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const statusIcons = {
    paid: <CheckCircle size={16} />,
    pending: <Clock size={16} />,
    overdue: <AlertCircle size={16} />,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoicing</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Create and manage invoices</p>
        </div>
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          <Plus size={20} />
          Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹ 25.5L</p>
            </div>
            <DollarSign size={32} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Paid</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹ 15.0L</p>
            </div>
            <CheckCircle size={32} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹ 7.5L</p>
            </div>
            <Clock size={32} className="text-yellow-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Overdue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹ 3.0L</p>
            </div>
            <AlertCircle size={32} className="text-red-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Invoice #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{invoice.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{invoice.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{invoice.type}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">₹ {invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{invoice.date}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[invoice.status]}`}>
                      {statusIcons[invoice.status]}
                      {invoice.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-800 dark:text-green-400">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoicing;
