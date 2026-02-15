import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhatsAppFlows = () => {
  const navigate = useNavigate();

  const [flows, setFlows] = useState([
    {
      id: 1,
      name: "Pricing Inquiry",
      active: true,
      description: 'If message contains "pricing"',
    },
  ]);

  const deleteFlow = (id) => {
    setFlows(flows.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            WhatsApp Automation Flows
          </h1>
          <p className="text-gray-500 mt-1">
            Design automation logic (n8n-style)
          </p>
        </div>

        <button
          onClick={() => navigate("/whatsapp/flows/new")}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold"
        >
          <Plus size={18} />
          New Flow
        </button>
      </div>

      {/* Flow List */}
      <div className="space-y-3">
        {flows.map((flow) => (
          <div
            key={flow.id}
            onClick={() => navigate(`/whatsapp/flows/${flow.id}`)}
            className="bg-white border rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-green-500"
          >
            <div>
              <p className="font-semibold text-gray-800">
                {flow.name}
              </p>
              <p className="text-sm text-gray-500">
                {flow.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  flow.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {flow.active ? "Active" : "Paused"}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFlow(flow.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppFlows;
