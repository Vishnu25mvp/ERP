import React, { useState } from "react";
import {
  Search,
  Phone,
  MessageSquare,
  Trash2,
  Eye,
  Filter,
} from "lucide-react";

const CRMLeads = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      email: "rajesh@example.com",
      source: "Meta Ads",
      status: "New",
      score: 85,
      assignedTo: "Amit Singh",
      lastContact: "2024-01-20",
      createdAt: "2024-01-15",
      notes: "Interested in enterprise plan",
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 9876543211",
      email: "priya@example.com",
      source: "WhatsApp",
      status: "Interested",
      score: 72,
      assignedTo: "Neha Gupta",
      lastContact: "2024-01-18",
      createdAt: "2024-01-10",
      notes: "Waiting for demo",
    },
    {
      id: 3,
      name: "Vikram Patel",
      phone: "+91 9876543212",
      email: "vikram@example.com",
      source: "Google Ads",
      status: "Contacted",
      score: 60,
      assignedTo: "Rahul Singh",
      lastContact: "2024-01-15",
      createdAt: "2024-01-05",
      notes: "Follow-up required",
    },
  ]);

  const [selectedLead, setSelectedLead] = useState(null);

  // ✅ Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [source, setSource] = useState("All");
  const [assignedTo, setAssignedTo] = useState("All");
  const [score, setScore] = useState("All");

  // ✅ Badge Colors
  const statusColors = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Interested: "bg-purple-100 text-purple-700",
    Converted: "bg-green-100 text-green-700",
    Closed: "bg-gray-200 text-gray-700",
  };

  // ✅ Delete Lead
  const deleteLead = (id) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  // ✅ Apply Filters
  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);

    const matchStatus = status === "All" || lead.status === status;
    const matchSource = source === "All" || lead.source === source;
    const matchAssigned =
      assignedTo === "All" || lead.assignedTo === assignedTo;

    const matchScore =
      score === "All" ||
      (score === "High" && lead.score >= 75) ||
      (score === "Medium" && lead.score >= 50 && lead.score < 75) ||
      (score === "Low" && lead.score < 50);

    return matchSearch && matchStatus && matchSource && matchAssigned && matchScore;
  });

  return (
    <div className="space-y-6">
      {/* ✅ Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CRM Leads</h1>
        <p className="text-gray-500 text-sm mt-1">
          Compact lead management with advanced filters
        </p>
      </div>

      {/* ✅ Filters Bar */}
      <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="All">All Status</option>
          {Object.keys(statusColors).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Source Filter */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="All">All Sources</option>
          <option>Meta Ads</option>
          <option>Google Ads</option>
          <option>WhatsApp</option>
          <option>99acres</option>
        </select>

        {/* Assigned Filter */}
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="All">All Agents</option>
          <option>Amit Singh</option>
          <option>Neha Gupta</option>
          <option>Rahul Singh</option>
        </select>

        {/* Score Filter */}
        <select
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="All">All Scores</option>
          <option value="High">High (75+)</option>
          <option value="Medium">Medium (50-74)</option>
          <option value="Low">Low (&lt;50)</option>
        </select>

        <Filter size={18} className="text-green-600" />
      </div>

      {/* ✅ Compact Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Lead</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Assigned</th>
              <th className="px-4 py-3">Last Contact</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-green-50 transition"
              >
                {/* Lead Info */}
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-800">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.email}</p>
                  <p className="text-xs text-gray-500">{lead.phone}</p>
                </td>

                {/* Source */}
                <td className="px-4 py-3">{lead.source}</td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </td>

                {/* Score */}
                <td className="px-4 py-3 font-semibold">{lead.score}</td>

                {/* Assigned */}
                <td className="px-4 py-3">{lead.assignedTo}</td>

                {/* Date */}
                <td className="px-4 py-3 text-gray-500">
                  {lead.lastContact}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={16} />
                  </button>

                  {/* <button className="text-green-600 hover:text-green-800">
                    <Phone size={16} />
                  </button>

                  <button className="text-green-700 hover:text-green-900">
                    <MessageSquare size={16} />
                  </button> */}

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No leads found with selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Lead Detail Modal */}
      {selectedLead && (
        <Modal title="Lead Details" onClose={() => setSelectedLead(null)}>
          <p>
            <b>Name:</b> {selectedLead.name}
          </p>
          <p>
            <b>Email:</b> {selectedLead.email}
          </p>
          <p>
            <b>Phone:</b> {selectedLead.phone}
          </p>
          <p>
            <b>Status:</b> {selectedLead.status}
          </p>
          <p>
            <b>Notes:</b> {selectedLead.notes}
          </p>
        </Modal>
      )}
    </div>
  );
};

/* ✅ Modal */
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
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

export default CRMLeads;
