import StatCard from "../components/StatCard";
import {
  BarChart3,
  Zap,
  TrendingUp,
  Users,
  FileText,
  Activity,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)" }} className="text-sm mt-1">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Zap}
          title="Active Workflows"
          value="12"
          action="Manage"
        />
        <StatCard icon={Users} title="New Leads" value="48" action="View" />
        <StatCard
          icon={TrendingUp}
          title="Stock Alerts"
          value="5"
          action="Check"
        />
        <StatCard
          icon={Activity}
          title="Team Members"
          value="24"
          action="Manage"
        />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <h2 className="font-semibold text-lg mb-4" style={{ color: "var(--text-primary)" }}>
            Quick Actions
          </h2>

          <div className="space-y-3">
            {[
              { label: "Create Workflow", icon: Zap },
              { label: "Add Lead", icon: Users },
              { label: "New Product", icon: FileText },
              { label: "Schedule Meeting", icon: Activity },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border transition hover:bg-secondary group"
                  style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: isDark ? "transparent" : "var(--bg-secondary)",
                  }}
                >
                  <Icon
                    size={16}
                    style={{ color: "var(--accent-primary)" }}
                  />
                  <span
                    className="text-sm font-medium group-hover:text-accent-primary transition"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CRM Overview */}
        <div
          className="lg:col-span-2 rounded-2xl p-6 border"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
              Business Metrics
            </h2>
            <div
              className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--accent-primary)",
              }}
            >
              +12.5%
            </div>
          </div>

          <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-6">
            Key performance indicators for this month
          </p>

          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Leads", value: "245", icon: Users },
              { label: "Deals", value: "68", icon: TrendingUp },
              { label: "Conversions", value: "32", icon: BarChart3 },
            ].map((metric, idx) => {
              const MetricIcon = metric.icon;
              return (
                <div key={idx} className="text-center">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg mx-auto mb-2"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <MetricIcon
                      size={20}
                      style={{ color: "var(--accent-primary)" }}
                    />
                  </div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {metric.value}
                  </p>
                  <p
                    style={{ color: "var(--text-secondary)" }}
                    className="text-sm mt-1"
                  >
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className="rounded-2xl p-6 border"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <h2 className="font-semibold text-lg mb-4" style={{ color: "var(--text-primary)" }}>
          Recent Activity
        </h2>

        <div className="space-y-3">
          {[
            { action: "Workflow completed", time: "2 hours ago", status: "success" },
            { action: "New lead assigned", time: "5 hours ago", status: "info" },
            { action: "Product inventory updated", time: "1 day ago", status: "info" },
            { action: "Team member joined", time: "3 days ago", status: "success" },
          ].map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg border"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      activity.status === "success"
                        ? "var(--accent-primary)"
                        : "#3b82f6",
                  }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {activity.action}
                </span>
              </div>
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
