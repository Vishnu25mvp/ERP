import React, { useState } from "react";
import {
  Users,
  Shuffle,
  UserCheck,
  Filter,
} from "lucide-react";

const CRMLeadAssignment = () => {
  /* Dummy Leads */
  const [leads, setLeads] = useState([
    { id: 1, name: "Rajesh Kumar", source: "Meta Ads", status: "New", assignedTo: null },
    { id: 2, name: "Priya Sharma", source: "Google Ads", status: "New", assignedTo: null },
    { id: 3, name: "Vikram Patel", source: "WhatsApp", status: "Follow-up", assignedTo: null },
  ]);

  /* Agents */
  const agents = [
    { id: 1, name: "Amit Singh", group: "Sales A" },
    { id: 2, name: "Neha Gupta", group: "Sales A" },
    { id: 3, name: "Rahul Singh", group: "Sales B" },
  ];

  /* Assignment State */
  const [assignmentType, setAssignmentType] = useState("manual");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [scope, setScope] = useState("all");
  const [group, setGroup] = useState("all");

  /* Manual Assignment */
  const assignManually = () => {
    if (!selectedAgent) return;

    setLeads((prev) =>
      prev.map((lead) =>
        scope === "all" || lead.source === scope
          ? { ...lead, assignedTo: selectedAgent }
          : lead
      )
    );
  };

  /* Automatic Assignment (Round Robin Simulation) */
  const assignAutomatically = () => {
    let index = 0;

    setLeads((prev) =>
      prev.map((lead) => {
        if (scope !== "all" && lead.source !== scope) return lead;

        const agent = agents[index % agents.length];
        index++;

        return { ...lead, assignedTo: agent.name };
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Lead Assignment
        </h1>
        <p className="text-gray-500 mt-1">
          Assign leads manually or automatically to agents
        </p>
      </div>

      {/* Assignment Controls */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
        {/* Scope Selection */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Filter size={16} />
            Select Lead Scope
          </h3>

          <div className="flex gap-3 flex-wrap">
            {["all", "Meta Ads", "Google Ads", "WhatsApp"].map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
                  scope === s
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white"
                }`}
              >
                {s === "all" ? "All Leads" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Assignment Type */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Assignment Type
          </h3>

          <div className="flex gap-4">
            <button
              onClick={() => setAssignmentType("manual")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border ${
                assignmentType === "manual"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white"
              }`}
            >
              <UserCheck size={16} />
              Manual
            </button>

            <button
              onClick={() => setAssignmentType("auto")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border ${
                assignmentType === "auto"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white"
              }`}
            >
              <Shuffle size={16} />
              Automatic
            </button>
          </div>
        </div>

        {/* Manual Assignment */}
        {assignmentType === "manual" && (
          <div className="space-y-4">
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Agent</option>
              {agents.map((a) => (
                <option key={a.id}>{a.name}</option>
              ))}
            </select>

            <button
              onClick={assignManually}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Assign Leads
            </button>
          </div>
        )}

        {/* Automatic Assignment */}
        {assignmentType === "auto" && (
          <button
            onClick={assignAutomatically}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Run Auto Assignment (Round Robin)
          </button>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Lead</th>
              <th className="px-6 py-3 text-center font-semibold">Source</th>
              <th className="px-6 py-3 text-center font-semibold">Status</th>
              <th className="px-6 py-3 text-center font-semibold">Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-green-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {lead.name}
                </td>
                <td className="px-6 py-4 text-center">{lead.source}</td>
                <td className="px-6 py-4 text-center">{lead.status}</td>
                <td className="px-6 py-4 text-center font-semibold text-green-700">
                  {lead.assignedTo || "Unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Users size={16} className="text-green-700" />
          Auto assignment uses round-robin logic (frontend simulation).
        </p>
      </div>
    </div>
  );
};

export default CRMLeadAssignment;
