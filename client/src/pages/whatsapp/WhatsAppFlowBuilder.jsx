import React, { useState } from "react";
import {
  Plus,
  ArrowRight,
  Webhook,
  Filter,
  Database,
  UserCheck,
  MessageSquare,
  Power,
  Trash2,
} from "lucide-react";

const WhatsAppFlowBuilder = () => {
  const [flows, setFlows] = useState([
    {
      id: 1,
      name: "Pricing Inquiry Flow",
      active: true,
      nodes: [
        { type: "trigger", label: "Incoming WhatsApp Message" },
        { type: "condition", label: 'Message contains "pricing"' },
        { type: "action", label: "Create / Update Lead" },
        { type: "action", label: "Set Lead Status = Interested" },
        { type: "action", label: "Assign to Sales Team" },
      ],
    },
  ]);

  const [selectedFlow, setSelectedFlow] = useState(flows[0]);

  const toggleFlow = (id) => {
    setFlows((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, active: !f.active } : f
      )
    );
  };

  const deleteFlow = (id) => {
    setFlows(flows.filter((f) => f.id !== id));
    setSelectedFlow(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          WhatsApp Flow Builder
        </h1>
        <p className="text-gray-500 mt-1">
          Design automation flows like n8n (no manual replies)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT: Flow List */}
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-800">Flows</p>
            <button className="text-green-600">
              <Plus size={18} />
            </button>
          </div>

          {flows.map((flow) => (
            <div
              key={flow.id}
              onClick={() => setSelectedFlow(flow)}
              className={`p-3 rounded-lg border cursor-pointer ${
                selectedFlow?.id === flow.id
                  ? "border-green-600 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold text-sm">{flow.name}</p>

              <div className="flex justify-between items-center mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    flow.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {flow.active ? "Active" : "Paused"}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFlow(flow.id);
                  }}
                  className="text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Flow Canvas */}
        <div className="lg:col-span-3 bg-white border rounded-xl p-6">
          {selectedFlow ? (
            <>
              {/* Flow Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">
                  {selectedFlow.name}
                </h2>

                <button
                  onClick={() => toggleFlow(selectedFlow.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                    selectedFlow.active
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  <Power size={16} />
                  {selectedFlow.active ? "Enabled" : "Disabled"}
                </button>
              </div>

              {/* Nodes */}
              <div className="flex flex-col items-center gap-4">
                {selectedFlow.nodes.map((node, idx) => (
                  <React.Fragment key={idx}>
                    <Node type={node.type} label={node.label} />
                    {idx < selectedFlow.nodes.length - 1 && (
                      <ArrowRight className="text-gray-400 rotate-90" />
                    )}
                  </React.Fragment>
                ))}

                {/* Add Node */}
                <button className="mt-4 flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-green-50">
                  <Plus size={16} />
                  Add Node
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              Select a flow to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppFlowBuilder;

/* Node Component */
const Node = ({ type, label }) => {
  const iconMap = {
    trigger: <Webhook size={18} />,
    condition: <Filter size={18} />,
    action: <Database size={18} />,
    assign: <UserCheck size={18} />,
    message: <MessageSquare size={18} />,
  };

  return (
    <div className="w-full max-w-md border rounded-xl p-4 bg-gray-50 flex items-center gap-3">
      <div className="text-green-600">
        {iconMap[type] || <Database size={18} />}
      </div>
      <p className="font-semibold text-sm text-gray-800">
        {label}
      </p>
    </div>
  );
};
