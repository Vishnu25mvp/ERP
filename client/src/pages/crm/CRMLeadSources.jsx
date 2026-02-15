import React, { useState } from "react";
import {
  BarChart3,
  Globe,
  TrendingUp,
  TrendingDown,
  Search,
} from "lucide-react";

const CRMLeadSources = () => {
  const [sources] = useState([
    {
      id: 1,
      name: "Meta Ads",
      leads: 120,
      converted: 25,
      costPerLead: 45,
      trend: "up",
    },
    {
      id: 2,
      name: "Google Ads",
      leads: 90,
      converted: 18,
      costPerLead: 60,
      trend: "down",
    },
    {
      id: 3,
      name: "WhatsApp",
      leads: 70,
      converted: 30,
      costPerLead: 10,
      trend: "up",
    },
    {
      id: 4,
      name: "99acres",
      leads: 55,
      converted: 12,
      costPerLead: 35,
      trend: "up",
    },
    {
      id: 5,
      name: "Threads",
      leads: 40,
      converted: 6,
      costPerLead: 25,
      trend: "down",
    },
    {
      id: 6,
      name: "Organic Website",
      leads: 65,
      converted: 20,
      costPerLead: 0,
      trend: "up",
    },
  ]);

  const [search, setSearch] = useState("");

  // ✅ Filter Sources
  const filteredSources = sources.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* ✅ Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Lead Sources Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Track performance of all lead generation platforms
        </p>
      </div>

      {/* ✅ Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Sources"
          value={sources.length}
          icon={<Globe className="text-green-600" />}
        />
        <StatCard
          title="Total Leads"
          value={sources.reduce((sum, s) => sum + s.leads, 0)}
          icon={<BarChart3 className="text-blue-600" />}
        />
        <StatCard
          title="Total Converted"
          value={sources.reduce((sum, s) => sum + s.converted, 0)}
          icon={<TrendingUp className="text-green-700" />}
        />
        <StatCard
          title="Avg Cost/Lead"
          value={
            "₹" +
            Math.round(
              sources.reduce((sum, s) => sum + s.costPerLead, 0) /
                sources.length
            )
          }
          icon={<BarChart3 className="text-orange-600" />}
        />
      </div>

      {/* ✅ Search */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lead source..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
          />
        </div>
      </div>

      {/* ✅ Sources Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                Source
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Leads
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Converted
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Conversion %
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Cost / Lead
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Trend
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSources.map((src) => {
              const conversionRate = Math.round(
                (src.converted / src.leads) * 100
              );

              return (
                <tr
                  key={src.id}
                  className="border-b hover:bg-green-50 transition"
                >
                  {/* Source */}
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {src.name}
                  </td>

                  {/* Leads */}
                  <td className="px-6 py-4 text-center">
                    {src.leads}
                  </td>

                  {/* Converted */}
                  <td className="px-6 py-4 text-center text-green-700 font-semibold">
                    {src.converted}
                  </td>

                  {/* Conversion */}
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
                      {conversionRate}%
                    </span>
                  </td>

                  {/* Cost */}
                  <td className="px-6 py-4 text-center">
                    {src.costPerLead === 0
                      ? "Free"
                      : `₹${src.costPerLead}`}
                  </td>

                  {/* Trend */}
                  <td className="px-6 py-4 text-center">
                    {src.trend === "up" ? (
                      <span className="flex justify-center items-center gap-1 text-green-700 font-semibold">
                        <TrendingUp size={16} />
                        Up
                      </span>
                    ) : (
                      <span className="flex justify-center items-center gap-1 text-red-600 font-semibold">
                        <TrendingDown size={16} />
                        Down
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {filteredSources.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No sources found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Insight Box */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-2">
          Insights
        </h3>
        <p className="text-sm text-gray-600">
          WhatsApp has the highest conversion rate, while Meta Ads
          generates the most volume. Google Ads cost per lead is
          higher, but still delivers quality conversions.
        </p>
      </div>
    </div>
  );
};

export default CRMLeadSources;

/* ✅ Small Stat Card Component */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white border rounded-xl shadow-sm p-5 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-500 font-semibold">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {value}
      </p>
    </div>
    <div className="opacity-20">{icon}</div>
  </div>
);
