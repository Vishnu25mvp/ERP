import React, { useState } from "react";
import {
  PhoneCall,
  PhoneMissed,
  Search,
  PlayCircle,
  User,
  Clock,
  Mic,
} from "lucide-react";

export default function CRMCallLogs() {
  // ✅ Dummy Call Logs Data
  const [callLogs] = useState([
    {
      id: 1,
      from: "+91 9876543210",
      leadName: "Rajesh Kumar",
      agent: "Amit Singh",
      duration: 320,
      status: "Answered",
      recording: true,
      time: "2026-01-27 11:20 AM",
      notes: "Interested in enterprise plan. Demo scheduled.",
    },
    {
      id: 2,
      from: "+91 9876543222",
      leadName: "Priya Sharma",
      agent: "Neha Gupta",
      duration: 0,
      status: "Missed",
      recording: false,
      time: "2026-01-27 10:45 AM",
      notes: "Customer did not answer. Follow-up required.",
    },
    {
      id: 3,
      from: "+91 9876543333",
      leadName: "Vikram Patel",
      agent: "Rahul Singh",
      duration: 180,
      status: "Answered",
      recording: true,
      time: "2026-01-26 06:15 PM",
      notes: "Discussed pricing. Negotiation ongoing.",
    },
  ]);

  const [search, setSearch] = useState("");

  // ✅ Filter Logs
  const filteredLogs = callLogs.filter(
    (log) =>
      log.leadName.toLowerCase().includes(search.toLowerCase()) ||
      log.agent.toLowerCase().includes(search.toLowerCase()) ||
      log.from.includes(search)
  );

  // ✅ Format Duration
  const formatDuration = (sec) => {
    if (sec === 0) return "-";
    const min = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${min}m ${rem}s`;
  };

  // ✅ Status Badge
  const statusBadge = (status) => {
    if (status === "Answered") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          Answered
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        Missed
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Call Tracking & Logs
        </h1>
        <p className="text-gray-500 mt-1">
          Track agent calls, duration, recordings and follow-ups
        </p>
      </div>

      {/* Search */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by lead, agent, phone..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
          />
        </div>
      </div>

      {/* Call Logs Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Lead</th>
              <th className="px-6 py-4 text-center font-semibold">Agent</th>
              <th className="px-6 py-4 text-center font-semibold">
                Duration
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Recording
              </th>
              <th className="px-6 py-4 text-center font-semibold">Time</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className="border-b hover:bg-green-50 transition"
              >
                {/* Lead */}
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-800">
                    {log.leadName}
                  </p>
                  <p className="text-xs text-gray-500">{log.from}</p>
                </td>

                {/* Agent */}
                <td className="px-6 py-4 text-center">
                  <span className="flex justify-center items-center gap-2 text-gray-700 font-medium">
                    <User size={16} />
                    {log.agent}
                  </span>
                </td>

                {/* Duration */}
                <td className="px-6 py-4 text-center text-gray-700 font-semibold">
                  <span className="flex justify-center items-center gap-1">
                    <Clock size={14} />
                    {formatDuration(log.duration)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  {statusBadge(log.status)}
                </td>

                {/* Recording */}
                <td className="px-6 py-4 text-center">
                  {log.recording ? (
                    <button className="flex justify-center items-center gap-1 text-green-700 hover:text-green-900 font-semibold">
                      <PlayCircle size={18} />
                      Play
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">No</span>
                  )}
                </td>

                {/* Time */}
                <td className="px-6 py-4 text-center text-gray-500 text-xs">
                  {log.time}
                </td>
              </tr>
            ))}

            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No call logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Notes Section */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Mic size={18} className="text-green-700" />
          Call Recording & Notes
        </h3>
        <p className="text-sm text-gray-600">
          Each answered call can store a recording link and agent notes.  
          In backend integration, recordings come from Twilio/Exotel/Aircall.
        </p>
      </div>
    </div>
  );
}
