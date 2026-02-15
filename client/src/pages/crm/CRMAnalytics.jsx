import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Globe,
  Star,
} from "lucide-react";

export default function CRMAnalytics() {
  // Dummy Analytics Data
  const [stats] = useState({
    totalLeads: 340,
    hotLeads: 120,
    converted: 68,
    pipelineValue: 1250000,
  });

  const leadSources = [
    { name: "Meta Ads", leads: 120 },
    { name: "Google Ads", leads: 90 },
    { name: "WhatsApp", leads: 70 },
    { name: "99acres", leads: 40 },
    { name: "Organic", leads: 20 },
  ];

  const agentPerformance = [
    { agent: "Amit Singh", deals: 18, revenue: 320000 },
    { agent: "Neha Gupta", deals: 15, revenue: 280000 },
    { agent: "Rahul Singh", deals: 10, revenue: 190000 },
  ];

  const funnel = [
    { stage: "New Leads", value: 340 },
    { stage: "Contacted", value: 220 },
    { stage: "Interested", value: 150 },
    { stage: "Proposal", value: 90 },
    { stage: "Converted", value: 68 },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          CRM Analytics Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor lead performance, conversions, pipeline and team productivity
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={<Users />}
        />
        <StatCard
          title="Hot Leads"
          value={stats.hotLeads}
          icon={<Star />}
        />
        <StatCard
          title="Converted Deals"
          value={stats.converted}
          icon={<Target />}
        />
        <StatCard
          title="Pipeline Value"
          value={`₹${(stats.pipelineValue / 100000).toFixed(1)}L`}
          icon={<TrendingUp />}
        />
      </div>

      {/* Leads by Source */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Globe className="text-green-600" size={18} />
          Leads by Source
        </h2>

        <div className="space-y-3">
          {leadSources.map((src) => (
            <div key={src.name}>
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>{src.name}</span>
                <span>{src.leads}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${(src.leads / stats.totalLeads) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="text-green-600" size={18} />
          Conversion Funnel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {funnel.map((step) => (
            <div
              key={step.stage}
              className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
            >
              <p className="text-sm text-gray-600">{step.stage}</p>
              <p className="text-xl font-bold text-green-700 mt-2">
                {step.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Performance Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <h2 className="text-lg font-bold text-gray-800 p-6 flex items-center gap-2">
          <Users className="text-green-600" size={18} />
          Agent Performance
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">
                Agent
              </th>
              <th className="px-6 py-3 text-center font-semibold">
                Deals Closed
              </th>
              <th className="px-6 py-3 text-center font-semibold">
                Revenue Generated
              </th>
            </tr>
          </thead>

          <tbody>
            {agentPerformance.map((a) => (
              <tr
                key={a.agent}
                className="border-b hover:bg-green-50 transition"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {a.agent}
                </td>
                <td className="px-6 py-4 text-center">
                  {a.deals}
                </td>
                <td className="px-6 py-4 text-center font-bold text-green-700">
                  ₹{a.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-2">
          Key Insights
        </h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✅ Meta Ads generates the highest number of leads.</li>
          <li>✅ WhatsApp has the best conversion rate.</li>
          <li>⚠ Negotiation stage has the most drop-offs.</li>
          <li>🏆 Amit Singh is the top-performing agent.</li>
        </ul>
      </div>
    </div>
  );
}

/* KPI Card */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white border rounded-xl shadow-sm p-5 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-500 font-semibold">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className="text-green-600 opacity-20">{icon}</div>
  </div>
);
