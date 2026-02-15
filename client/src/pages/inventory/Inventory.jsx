import React, { useState } from 'react';
import {
  Plus,
  Package,
  TrendingDown,
  AlertTriangle,
  Edit2,
  Trash2,
  Eye,
  ArrowRight,
} from 'lucide-react';

const Inventory = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Laptop Pro 15"',
      category: 'Electronics',
      sku: 'LPT-001',
      inStock: 45,
      reorderPoint: 20,
      price: 85000,
      cost: 65000,
    },
    {
      id: 2,
      name: 'Dell Monitor 4K',
      category: 'Electronics',
      sku: 'DTR-001',
      inStock: 8,
      reorderPoint: 15,
      price: 35000,
      cost: 22000,
    },
    {
      id: 3,
      name: 'Office Chair',
      category: 'Furniture',
      sku: 'CHR-001',
      inStock: 52,
      reorderPoint: 10,
      price: 8500,
      cost: 4500,
    },
  ]);

  const lowStockItems = products.filter(p => p.inStock <= p.reorderPoint);
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.inStock * p.cost), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track stock and manage products</p>
        </div>
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{products.length}</p>
            </div>
            <Package size={32} className="text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹{(totalInventoryValue / 100000).toFixed(2)}L</p>
            </div>
            <Package size={32} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{lowStockItems.length}</p>
            </div>
            <AlertTriangle size={32} className="text-red-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Reorder Needed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{lowStockItems.length}</p>
            </div>
            <TrendingDown size={32} className="text-orange-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">In Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Reorder Point</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Cost Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Sell Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Total Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isLowStock = product.inStock <= product.reorderPoint;
                return (
                  <tr key={product.id} className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${isLowStock ? 'bg-red-50 dark:bg-red-900/20' : ''}`}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.sku}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{product.inStock}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.reorderPoint}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">₹ {product.cost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">₹ {product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">₹ {(product.inStock * product.cost).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isLowStock
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {isLowStock ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-800 dark:text-green-400">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition text-left">
          <Plus size={24} className="text-blue-500 mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Create Purchase Order</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Order new stock</p>
        </button>

        <button className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition text-left">
          <Plus size={24} className="text-green-500 mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Receive Goods</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create GRN</p>
        </button>

        <button className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition text-left">
          <ArrowRight size={24} className="text-purple-500 mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Transfer Stock</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Between branches</p>
        </button>
      </div>
    </div>
  );
};

export default Inventory;
