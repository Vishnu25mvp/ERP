import React, { useState } from "react";
import {
  Upload,
  Database,
  Cloud,
  Eye,
  Send,
} from "lucide-react";

const WhatsAppCampaigns = () => {
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [leadSource, setLeadSource] = useState("crm");
  const [template, setTemplate] = useState("");
  const [leadsCount, setLeadsCount] = useState(0);

  const templates = [
    {
      id: 1,
      name: "Demo Follow-up",
      content:
        "Hi {{1}}, thanks for your interest. Reply YES to schedule a demo.",
    },
    {
      id: 2,
      name: "Limited Offer",
      content:
        "Hello {{1}}, limited time offer available. Reply OFFER to know more.",
    },
  ];

  const loadLeads = () => {
    // 🔌 API Placeholder
    // CRM / CSV / External Sync
    setLeadsCount(120);
    setStep(3);
  };

  const launchCampaign = () => {
    // 🔌 API Placeholder
    // POST /api/whatsapp/campaigns
    alert("Campaign queued successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Create WhatsApp Campaign
        </h1>
        <p className="text-gray-500 mt-1">
          Send template messages to selected leads
        </p>
      </div>

      {/* STEP 1 – Campaign Info */}
      {step === 1 && (
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-gray-800">
            Campaign Details
          </h3>

          <input
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Campaign name"
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            onClick={() => setStep(2)}
            disabled={!campaignName}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Next
          </button>
        </div>
      )}

      {/* STEP 2 – Lead Source */}
      {step === 2 && (
        <div className="bg-white border rounded-xl p-6 space-y-5">
          <h3 className="font-semibold text-gray-800">
            Select Lead Source
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SourceCard
              icon={<Database />}
              title="CRM Leads"
              active={leadSource === "crm"}
              onClick={() => setLeadSource("crm")}
            />

            <SourceCard
              icon={<Upload />}
              title="Upload CSV"
              active={leadSource === "csv"}
              onClick={() => setLeadSource("csv")}
            />

            <SourceCard
              icon={<Cloud />}
              title="External Sync"
              active={leadSource === "external"}
              onClick={() => setLeadSource("external")}
            />
          </div>

          <button
            onClick={loadLeads}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Load Leads
          </button>
        </div>
      )}

      {/* STEP 3 – Template */}
      {step === 3 && (
        <div className="bg-white border rounded-xl p-6 space-y-5">
          <h3 className="font-semibold text-gray-800">
            Select Message Template
          </h3>

          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => setTemplate(t.content)}
              className={`border rounded-lg p-4 cursor-pointer ${
                template === t.content
                  ? "border-green-600 bg-green-50"
                  : ""
              }`}
            >
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                {t.content}
              </p>
            </div>
          ))}

          <button
            onClick={() => setStep(4)}
            disabled={!template}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Preview
          </button>
        </div>
      )}

      {/* STEP 4 – Review & Launch */}
      {step === 4 && (
        <div className="bg-white border rounded-xl p-6 space-y-6">
          <h3 className="font-semibold text-gray-800">
            Review Campaign
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Campaign:</strong> {campaignName}
            </p>
            <p>
              <strong>Leads Loaded:</strong> {leadsCount}
            </p>
            <p>
              <strong>Template:</strong>
            </p>
            <div className="border p-3 rounded bg-gray-50">
              {template}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 border rounded-lg font-semibold"
            >
              Back
            </button>

            <button
              onClick={launchCampaign}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <Send size={16} />
              Launch Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppCampaigns;

/* Lead Source Card */
const SourceCard = ({ icon, title, active, onClick }) => (
  <div
    onClick={onClick}
    className={`border rounded-xl p-4 cursor-pointer text-center ${
      active ? "border-green-600 bg-green-50" : "hover:bg-gray-50"
    }`}
  >
    <div className="flex justify-center mb-2 text-green-600">
      {icon}
    </div>
    <p className="font-semibold">{title}</p>
  </div>
);
