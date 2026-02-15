import React, { useState } from "react";
import {
  Send,
  Users,
  FileText,
  Eye,
  Clock,
} from "lucide-react";

const WhatsAppBulk = () => {
  const [audience, setAudience] = useState("all");
  const [template, setTemplate] = useState("");
  const [schedule, setSchedule] = useState(false);

  const templates = [
    {
      id: 1,
      name: "Demo Follow-up",
      body: "Hi {{1}}, thanks for your interest. Our demo is on {{2}}.",
    },
    {
      id: 2,
      name: "Limited Offer",
      body: "Hello {{1}}, enjoy 20% off till {{2}}. Reply YES to continue.",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          WhatsApp Bulk Messaging
        </h1>
        <p className="text-gray-500 mt-1">
          Send approved WhatsApp templates to multiple leads
        </p>
      </div>

      {/* Step 1: Audience */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Users size={18} /> Select Audience
        </h3>

        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="all">All Opt-in Leads</option>
          <option value="new">New Leads</option>
          <option value="interested">Interested Leads</option>
          <option value="crm">CRM Filtered Leads</option>
        </select>
      </div>

      {/* Step 2: Template */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <FileText size={18} /> Select Template
        </h3>

        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">Select approved template</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {template && (
          <div className="bg-gray-50 border rounded-lg p-4 text-sm">
            <p className="font-semibold mb-2">Template Preview</p>
            {templates.find((t) => t.id == template)?.body}
          </div>
        )}
      </div>

      {/* Step 3: Schedule */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Clock size={18} /> Schedule
        </h3>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={schedule}
            onChange={() => setSchedule(!schedule)}
          />
          Schedule for later
        </label>

        {schedule && (
          <input
            type="datetime-local"
            className="border rounded-lg px-4 py-2"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="px-5 py-2 border rounded-lg font-semibold">
          Preview
        </button>

        <button
          disabled={!template}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          <Send size={16} />
          Send Campaign
        </button>
      </div>
    </div>
  );
};

export default WhatsAppBulk;
