import React, { useState, useEffect } from "react";
import {
  Phone,
  PhoneOff,
  User,
  Clock,
  FileText,
  CheckCircle,
} from "lucide-react";

const CRMOutboundCalls = () => {
  // ✅ Assigned Leads for Agent
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      status: "New",
      lastCall: "-",
      notes: "",
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 9876543211",
      status: "Follow-up",
      lastCall: "2026-01-26",
      notes: "Asked for callback",
    },
    {
      id: 3,
      name: "Vikram Patel",
      phone: "+91 9876543212",
      status: "New",
      lastCall: "-",
      notes: "",
    },
  ]);

  const [activeCall, setActiveCall] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [callNotes, setCallNotes] = useState("");
  const [callStatus, setCallStatus] = useState("Contacted");

  /* Call Timer */
  useEffect(() => {
    let timer;
    if (activeCall) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCall]);

  const startCall = (lead) => {
    setActiveCall(lead);
    setSeconds(0);
    setCallNotes(lead.notes || "");
    setCallStatus("Contacted");
  };

  const endCall = () => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === activeCall.id
          ? {
              ...l,
              status: callStatus,
              lastCall: new Date().toISOString().slice(0, 10),
              notes: callNotes,
            }
          : l
      )
    );

    setActiveCall(null);
    setSeconds(0);
    setCallNotes("");
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Outbound Calls
        </h1>
        <p className="text-gray-500 mt-1">
          Call assigned leads and update call outcome
        </p>
      </div>

      {/* Active Call Panel */}
      {activeCall && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Calling</p>
              <h2 className="text-xl font-bold text-gray-800">
                {activeCall.name}
              </h2>
              <p className="text-gray-600">{activeCall.phone}</p>
            </div>

            <div className="text-right">
              <p className="flex items-center gap-1 text-gray-700">
                <Clock size={16} />
                {formatTime(seconds)}
              </p>
              <button
                onClick={endCall}
                className="mt-3 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                <PhoneOff size={16} />
                End Call
              </button>
            </div>
          </div>

          {/* Call Notes */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Call Notes
            </label>
            <textarea
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              className="w-full h-24 border rounded-lg p-3 focus:ring-2 focus:ring-green-300 outline-none"
              placeholder="Add call notes..."
            />
          </div>

          {/* Call Outcome */}
          <div className="mt-4 flex gap-3">
            {["Contacted", "Interested", "Follow-up", "Not Interested"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setCallStatus(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
                    callStatus === s
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {s}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Leads List */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Lead</th>
              <th className="px-6 py-4 text-center font-semibold">Phone</th>
              <th className="px-6 py-4 text-center font-semibold">Status</th>
              <th className="px-6 py-4 text-center font-semibold">Last Call</th>
              <th className="px-6 py-4 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-green-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-gray-800 flex items-center gap-2">
                  <User size={16} />
                  {lead.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {lead.phone}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-500">
                  {lead.lastCall}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    disabled={!!activeCall}
                    onClick={() => startCall(lead)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm ${
                      activeCall
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    <Phone size={16} />
                    Call
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <CheckCircle size={16} className="text-green-700" />
          Calls are logged automatically with duration and notes ().
        </p>
      </div>
    </div>
  );
};

export default CRMOutboundCalls;
