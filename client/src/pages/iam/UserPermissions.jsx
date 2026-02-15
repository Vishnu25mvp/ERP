import React, { useState } from "react";
import { ShieldCheck, Save } from "lucide-react";

const modulesList = [
  {
    name: "CRM",
    permissions: ["Full Access", "Read Only", "Read + Write"],
  },
  {
    name: "Inventory",
    permissions: ["Full Access", "Read Only", "Read + Write"],
  },
  {
    name: "HRMS",
    permissions: ["Full Access", "Read Only", "Read + Write"],
  },
  {
    name: "Analytics",
    permissions: ["Full Access", "Read Only"],
  },
  {
    name: "Call Conversation",
    permissions: ["View Only", "View + Record"],
  },
  {
    name: "WhatsApp Automation",
    permissions: ["Enabled", "Disabled"],
  },
  {
    name: "Automation Tools",
    permissions: ["Full Access", "Limited Access"],
  },
];

export default function UserPermissions() {
  const [selectedUser, setSelectedUser] = useState("Rajesh Kumar");

  // ✅ Permission State
  const [permissions, setPermissions] = useState({
    CRM: "Full Access",
    Inventory: "Read Only",
    HRMS: "Read + Write",
    Analytics: "Read Only",
    "Call Conversation": "View Only",
    "WhatsApp Automation": "Enabled",
    "Automation Tools": "Limited Access",
  });

  // ✅ Update Permission
  const handleChange = (module, value) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: value,
    }));
  };

  // ✅ Save ()
  const handleSave = () => {
    console.log("Saved Permissions:", permissions);
    alert("Permissions Saved Successfully ✅ ()");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            User Permission Management
          </h1>
          <p className="text-gray-500 mt-1">
            Assign module-level access for staff members
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow font-semibold transition"
        >
          <Save size={18} />
          Save Permissions
        </button>
      </div>

      {/* Select User */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Staff Member
        </label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 outline-none"
        >
          <option>Rajesh Kumar</option>
          <option>Priya Sharma</option>
          <option>Vikram Patel</option>
          <option>Meera Singh</option>
        </select>
      </div>

      {/* Permission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modulesList.map((module) => (
          <div
            key={module.name}
            className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-green-600" size={20} />
              <h2 className="text-lg font-bold text-gray-800">
                {module.name}
              </h2>
            </div>

            {/* Permission Options */}
            <div className="space-y-2">
              {module.permissions.map((perm) => (
                <label
                  key={perm}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
                  ${
                    permissions[module.name] === perm
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={module.name}
                    value={perm}
                    checked={permissions[module.name] === perm}
                    onChange={() => handleChange(module.name, perm)}
                    className="accent-green-600"
                  />
                  <span className="text-gray-700 font-medium">{perm}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Output Preview */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-2">
          Current Permission Summary
        </h3>
        <pre className="text-sm text-gray-700">
          {JSON.stringify(permissions, null, 2)}
        </pre>
      </div>
    </div>
  );
}
