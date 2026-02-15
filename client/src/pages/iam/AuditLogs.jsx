import React, { useState } from "react";
import {
  Search,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function AuditLogs() {
  // ✅ Dummy Logs ()
  const [logs] = useState([
    {
      id: 1,
      user: "Rajesh Kumar",
      action: "Updated Permissions",
      module: "CRM",
      status: "success",
      time: "2026-01-27 10:30 AM",
    },
    {
      id: 2,
      user: "Priya Sharma",
      action: "Created Lead",
      module: "CRM",
      status: "success",
      time: "2026-01-27 09:15 AM",
    },
    {
      id: 3,
      user: "Vikram Patel",
      action: "Deleted Invoice",
      module: "Inventory",
      status: "failed",
      time: "2026-01-26 06:45 PM",
    },
    {
      id: 4,
      user: "Admin",
      action: "User Login",
      module: "Auth",
      status: "success",
      time: "2026-01-26 05:10 PM",
    },
    {
      id: 5,
      user: "Meera Singh",
      action: "Generated Report",
      module: "Analytics",
      status: "success",
      time: "2026-01-25 02:20 PM",
    },
  ]);

  const [search, setSearch] = useState("");

  // ✅ Filter Logs
  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.module.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Status Badge
  const statusBadge = (status) => {
    if (status === "success") {
      return (
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
          <CheckCircle size={14} />
          Success
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
        <XCircle size={14} />
        Failed
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* ✅ Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Audit Logs
        </h1>
        <p className="text-gray-500 mt-1">
          Track all user activities and security events
        </p>
      </div>

      {/* ✅ Search Bar */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs by user, module, action..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-300 outline-none"
          />
        </div>
      </div>

      {/* ✅ Logs Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-50 border-b">
            <tr>
              {["User", "Action", "Module", "Status", "Time"].map((h) => (
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
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className="border-b hover:bg-green-50 transition"
              >
                {/* User */}
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {log.user}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                  <ShieldAlert size={16} className="text-green-600" />
                  {log.action}
                </td>

                {/* Module */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                    {log.module}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">{statusBadge(log.status)}</td>

                {/* Time */}
                <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                  <Clock size={14} />
                  {log.time}
                </td>
              </tr>
            ))}

            {filteredLogs.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Summary Box */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-2">
          Audit Log Summary
        </h3>
        <p className="text-gray-600 text-sm">
          Total Events:{" "}
          <span className="font-bold">{logs.length}</span>
          <br />
          Successful Actions:{" "}
          <span className="font-bold text-green-700">
            {logs.filter((l) => l.status === "success").length}
          </span>
          <br />
          Failed Actions:{" "}
          <span className="font-bold text-red-700">
            {logs.filter((l) => l.status === "failed").length}
          </span>
        </p>
      </div>
    </div>
  );
}
