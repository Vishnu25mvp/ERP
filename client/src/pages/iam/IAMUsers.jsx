import React, { useState } from "react";
import {
  Search,
  Edit2,
  Trash2,
  Eye,
  UserPlus,
  Shield,
  Lock,
  Unlock,
} from "lucide-react";

const IAMUsers = () => {
  // ✅ Dynamic Staff State
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@company.com",
      role: "manager",
      status: "active",
      joinDate: "2023-06-15",
      lastLogin: "2024-01-25 14:30",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@company.com",
      role: "agent",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-25 13:45",
    },
    {
      id: 3,
      name: "Vikram Patel",
      email: "vikram@company.com",
      role: "agent",
      status: "inactive",
      joinDate: "2024-01-01",
      lastLogin: "2024-01-20 10:00",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "agent",
  });

  // ✅ Role Badge Colors
  const roleColors = {
    admin: "bg-red-100 text-red-700",
    manager: "bg-blue-100 text-blue-700",
    agent: "bg-green-100 text-green-700",
    accountant: "bg-purple-100 text-purple-700",
  };

  // ✅ Status Badge Colors
  const statusColors = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-200 text-gray-700",
  };

  // ✅ Filter Staff
  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.email.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Delete Staff
  const handleDelete = (id) => {
    setStaffMembers(staffMembers.filter((s) => s.id !== id));
  };

  // ✅ Toggle Status
  const toggleStatus = (id) => {
    setStaffMembers(
      staffMembers.map((s) =>
        s.id === id
          ? {
              ...s,
              status: s.status === "active" ? "inactive" : "active",
            }
          : s
      )
    );
  };

  // ✅ Add Staff
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    const user = {
      id: Date.now(),
      ...newUser,
      status: "active",
      joinDate: new Date().toISOString().slice(0, 10),
      lastLogin: "Never",
    };

    setStaffMembers([...staffMembers, user]);
    setShowAddModal(false);
    setNewUser({ name: "", email: "", role: "agent" });
  };

  return (
    <div className="space-y-8">
      {/* ✅ Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Staff & Roles Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage staff access levels & permissions
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow font-semibold transition"
        >
          <UserPlus size={18} />
          Add Staff
        </button>
      </div>

      {/* ✅ Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Staff"
          value={staffMembers.length}
          icon={<Shield className="text-green-600" />}
        />
        <StatCard
          title="Active Staff"
          value={staffMembers.filter((s) => s.status === "active").length}
          icon={<Unlock className="text-blue-600" />}
        />
        <StatCard
          title="Inactive Staff"
          value={staffMembers.filter((s) => s.status === "inactive").length}
          icon={<Lock className="text-red-600" />}
        />
      </div>

      {/* ✅ Search */}
      <div className="bg-white rounded-xl border p-4 shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-300 outline-none"
          />
        </div>
      </div>

      {/* ✅ Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-50 border-b">
            <tr>
              {["Name", "Email", "Role", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredStaff.map((staff) => (
              <tr
                key={staff.id}
                className="border-b hover:bg-green-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {staff.name}
                </td>

                <td className="px-6 py-4 text-gray-500">{staff.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      roleColors[staff.role]
                    }`}
                  >
                    {staff.role.toUpperCase()}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(staff.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[staff.status]
                    }`}
                  >
                    {staff.status}
                  </button>
                </td>

                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => setSelectedUser(staff)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={18} />
                  </button>

                  <button className="text-green-600 hover:text-green-800">
                    <Edit2 size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredStaff.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ View User Modal */}
      {selectedUser && (
        <Modal title={selectedUser.name} onClose={() => setSelectedUser(null)}>
          <p className="text-gray-600">
            Email: <b>{selectedUser.email}</b>
          </p>
          <p className="text-gray-600 mt-2">
            Role: <b>{selectedUser.role.toUpperCase()}</b>
          </p>
          <p className="text-gray-600 mt-2">
            Status: <b>{selectedUser.status}</b>
          </p>
        </Modal>
      )}

      {/* ✅ Add User Modal */}
      {showAddModal && (
        <Modal title="Add Staff Member" onClose={() => setShowAddModal(false)}>
          <div className="space-y-4">
            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="agent">Agent</option>
              <option value="manager">Manager</option>
              <option value="accountant">Accountant</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={handleAddUser}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              Add Staff
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

/* ✅ Small Components */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl border shadow-sm p-5 flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className="opacity-20">{icon}</div>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default IAMUsers;
