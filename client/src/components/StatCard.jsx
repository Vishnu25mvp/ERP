import { useTheme } from "../context/ThemeContext";
import { ArrowRight } from "lucide-react";

export default function StatCard({ title, value, action, icon: Icon }) {
  const { isDark } = useTheme();

  return (
    <div
      className="rounded-2xl p-6 border transition hover:shadow-lg hover:scale-105"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3
          className="text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {title}
        </h3>
        {Icon && (
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <Icon size={18} style={{ color: "var(--accent-primary)" }} />
          </div>
        )}
      </div>

      <p
        className="text-4xl font-bold mt-3"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>

      <button
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-white transition hover:opacity-90"
        style={{ backgroundColor: "var(--accent-primary)" }}
      >
        {action}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
