import React, { useState } from "react";
import {
  Plus,
  GripVertical,
  CheckCircle,
  XCircle,
} from "lucide-react";

/* مراحل Pipeline */
const stages = [
  { id: "contact", title: "Contact Made" },
  { id: "negotiation", title: "Negotiation" },
  { id: "proposal", title: "Proposal Sent" },
  { id: "won", title: "Won (Pending Close)" },
];

const CRMPipeline = () => {
  /* Active Deals */
  const [deals, setDeals] = useState([
    {
      id: 1,
      name: "Rajesh Kumar - Enterprise Plan",
      value: 150000,
      probability: 80,
      stage: "proposal",
    },
    {
      id: 2,
      name: "Priya Sharma - Professional Plan",
      value: 75000,
      probability: 60,
      stage: "negotiation",
    },
  ]);

  /* Closed Deals */
  const [closedDeals, setClosedDeals] = useState([]);

  /* Drag */
  const [draggedDeal, setDraggedDeal] = useState(null);

  /* Add Deal Modal */
  const [showModal, setShowModal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    name: "",
    value: "",
    probability: "",
  });

  /* Drop Deal into Stage */
  const handleDrop = (stageId) => {
    if (!draggedDeal) return;

    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === draggedDeal.id
          ? { ...deal, stage: stageId }
          : deal
      )
    );

    setDraggedDeal(null);
  };

  /* Close Deal (Only from Won) */
  const closeDeal = (deal) => {
    // Add into Closed Deals
    setClosedDeals((prev) => [...prev, deal]);

    // Remove from Active Deals
    setDeals((prev) => prev.filter((d) => d.id !== deal.id));
  };

  /* Delete Deal */
  const deleteDeal = (id) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  /* Add Deal */
  const handleAddDeal = () => {
    if (!newDeal.name || !newDeal.value) return;

    const deal = {
      id: Date.now(),
      name: newDeal.name,
      value: Number(newDeal.value),
      probability: Number(newDeal.probability) || 50,
      stage: "contact",
    };

    setDeals((prev) => [deal, ...prev]);
    setShowModal(false);
    setNewDeal({ name: "", value: "", probability: "" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sales Pipeline
          </h1>
          <p className="text-gray-500 mt-1">
            Add deals → Move stage by stage → Close when won
          </p>
        </div>

        {/* Add Deal Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow font-semibold"
        >
          <Plus size={18} />
          Add Deal
        </button>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stages.map((stage) => (
          <div
            key={stage.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage.id)}
            className="bg-white border rounded-xl shadow-sm p-4 min-h-[500px]"
          >
            {/* Stage Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">
                {stage.title}
              </h3>

              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                {deals.filter((d) => d.stage === stage.id).length}
              </span>
            </div>

            {/* Deals */}
            <div className="space-y-3">
              {deals
                .filter((d) => d.stage === stage.id)
                .map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => setDraggedDeal(deal)}
                    className="bg-green-50 border border-green-200 rounded-xl p-4 cursor-move hover:shadow-md transition"
                  >
                    {/* Deal Name */}
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-800 text-sm">
                        {deal.name}
                      </p>
                      <GripVertical size={16} className="text-gray-400" />
                    </div>

                    {/* Value */}
                    <p className="text-xs text-gray-600 mt-2">
                      Value:{" "}
                      <span className="font-bold text-gray-800">
                        ₹{deal.value.toLocaleString()}
                      </span>
                    </p>

                    {/* Probability */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {deal.probability}% probability
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      {/* Close Deal Button Only in Won */}
                      {stage.id === "won" ? (
                        <button
                          onClick={() => closeDeal(deal)}
                          className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded-lg text-xs font-semibold"
                        >
                          <CheckCircle size={14} />
                          Close Deal
                        </button>
                      ) : (
                        <button
                          onClick={() => deleteDeal(deal.id)}
                          className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg text-xs font-semibold"
                        >
                          <XCircle size={14} />
                          Lost
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Closed Deals Section */}
      {closedDeals.length > 0 && (
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            🎉 Closed Deals
          </h2>

          <div className="space-y-3">
            {closedDeals.map((deal) => (
              <div
                key={deal.id}
                className="flex justify-between items-center border rounded-lg p-3 bg-green-50"
              >
                <p className="font-semibold text-gray-800">
                  {deal.name}
                </p>
                <span className="font-bold text-green-700">
                  ₹{deal.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {showModal && (
        <Modal title="Add New Deal" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <input
              placeholder="Deal Name"
              value={newDeal.name}
              onChange={(e) =>
                setNewDeal({ ...newDeal, name: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              placeholder="Deal Value (₹)"
              value={newDeal.value}
              onChange={(e) =>
                setNewDeal({ ...newDeal, value: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              placeholder="Probability (%)"
              value={newDeal.probability}
              onChange={(e) =>
                setNewDeal({
                  ...newDeal,
                  probability: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <button
              onClick={handleAddDeal}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              Add Deal
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

/* Modal Component */
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

export default CRMPipeline;
