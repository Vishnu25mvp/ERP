import React, { useState } from "react";
import {
  Plus,
  FileText,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const WhatsAppTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Demo Follow-up",
      category: "Utility",
      body: "Hi {{1}}, your demo is scheduled on {{2}}.",
      status: "approved",
      language: "en",
    },
    {
      id: 2,
      name: "Limited Offer",
      category: "Marketing",
      body: "Hello {{1}}, enjoy 20% off till {{2}}.",
      status: "pending",
      language: "en",
    },
    {
      id: 3,
      name: "OTP Login",
      category: "Authentication",
      body: "Your login OTP is {{1}}.",
      status: "rejected",
      language: "en",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const statusBadge = (status) => {
    const map = {
      approved: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      rejected: "bg-red-100 text-red-700",
    };
    return map[status];
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            WhatsApp Templates
          </h1>
          <p className="text-gray-500 mt-1">
            Manage Meta-approved message templates
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold"
        >
          <Plus size={18} />
          New Template
        </button>
      </div>

      {/* Templates Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Template
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Language
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {templates.map((t) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">
                    {t.body}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm">
                  {t.category}
                </td>

                <td className="px-6 py-4 text-sm">
                  {t.language}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => setSelectedTemplate(t)}
                    className="text-blue-600"
                  >
                    <Eye size={16} />
                  </button>

                  {t.status !== "approved" && (
                    <button className="text-red-600">
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Template Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold">
              Create WhatsApp Template
            </h3>

            <input
              placeholder="Template name"
              className="w-full border rounded-lg px-4 py-2"
            />

            <select className="w-full border rounded-lg px-4 py-2">
              <option>Utility</option>
              <option>Marketing</option>
              <option>Authentication</option>
            </select>

            <select className="w-full border rounded-lg px-4 py-2">
              <option>English</option>
              <option>Hindi</option>
            </select>

            <textarea
              placeholder="Template message (use {{1}}, {{2}})"
              className="w-full border rounded-lg px-4 py-2 h-24"
            />

            <div className="text-xs text-gray-500">
              ⚠ Once approved, template text cannot be edited
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg font-semibold"
              >
                Cancel
              </button>

              <button className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold">
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-lg">
              {selectedTemplate.name}
            </h3>

            <div className="bg-gray-100 rounded-lg p-4 text-sm">
              {selectedTemplate.body}
            </div>

            <button
              onClick={() => setSelectedTemplate(null)}
              className="w-full border rounded-lg py-2 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppTemplates;
