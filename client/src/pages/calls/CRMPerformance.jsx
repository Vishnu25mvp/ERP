import React from "react";
import {
  PhoneCall,
  TrendingUp,
  Clock,
  Trophy,
  AlertTriangle,
} from "lucide-react";

const CRMPerformance = () => {
  const agents = [
    {
      id: 1,
      name: "Amit Singh",
      calls: 120,
      talkTime: 3400, // seconds
      leads: 80,
      deals: 22,
      revenue: 420000,
    },
    {
      id: 2,
      name: "Neha Gupta",
      calls: 95,
      talkTime: 2800,
      leads: 65,
      deals: 15,
      revenue: 310000,
    },
    {
      id: 3,
      name: "Rahul Singh",
      calls: 70,
      talkTime: 2100,
      leads: 55,
      deals: 8,
      revenue: 180000,
    },
  ];

  const totalCalls = agents.reduce((s, a) => s + a.calls, 0);
  const totalRevenue = agents.reduce((s, a) => s + a.revenue, 0);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const performanceBadge = (rate) => {
    if (rate >= 25)
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          Top Performer
        </span>
      );
    if (rate >= 15)
      return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
          Average
        </span>
      );
    return (
      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
        Needs Coaching
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Team Performance
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor agent productivity, calls, and conversions
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPI
          title="Total Calls"
          value={totalCalls}
          icon={<PhoneCall />}
        />
        <KPI
          title="Avg Call Time"
          value={formatTime(
            Math.round(
              agents.reduce((s, a) => s + a.talkTime, 0) / agents.length
            )
          )}
          icon={<Clock />}
        />
        <KPI
          title="Deals Closed"
          value={agents.reduce((s, a) => s + a.deals, 0)}
          icon={<TrendingUp />}
        />
        <KPI
          title="Revenue"
          value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
          icon={<Trophy />}
        />
      </div>

      {/* Performance Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                Agent
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Calls
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Talk Time
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Leads
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Deals
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Conversion %
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {agents.map((a) => {
              const conversion = Math.round(
                (a.deals / a.leads) * 100
              );

              return (
                <tr
                  key={a.id}
                  className="border-b hover:bg-green-50 transition"
                >
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {a.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {a.calls}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {formatTime(a.talkTime)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {a.leads}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-green-700">
                    {a.deals}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {conversion}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {performanceBadge(conversion)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <AlertTriangle size={18} />
          Performance Insights
        </h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>🏆 Amit Singh is the top performer this week</li>
          <li>📞 Higher talk time correlates with better conversions</li>
          <li>⚠ Rahul Singh may need call coaching</li>
        </ul>
      </div>
    </div>
  );
};

export default CRMPerformance;

/* KPI Card */
const KPI = ({ title, value, icon }) => (
  <div className="bg-white border rounded-xl shadow-sm p-5 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-500 font-semibold">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {value}
      </p>
    </div>
    <div className="text-green-600 opacity-20">{icon}</div>
  </div>
);
