import { useState } from "react";
import { LayoutGrid, Sun, Moon, Bell, Search, User, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const services = [
  { name: "CRM", icon: "👥", path: "/crm/leads" },
  { name: "Inventory", icon: "📦", path: "/inventory/products" },
  { name: "Automation", icon: "⚙️", path: "/automation" },
  { name: "HRMS", icon: "👔", path: "/hrms" },
  { name: "Analytics", icon: "📊", path: "/analytics" },
  { name: "Settings", icon: "⚡", path: "/settings" },
];

export default function Topbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isDark, toggleMode, theme } = useTheme();

  return (
    <header
      className="border-b"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left: Services & Search */}
        <div className="flex items-center gap-6 flex-1">
          {/* AWS Style Service Switcher */}
          {/* <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition text-primary"
              style={{ color: "var(--text-primary)" }}
            >
              <LayoutGrid size={20} />
              <span className="font-medium text-sm hidden sm:inline">
                Services
              </span>
              <ChevronDown size={16} />
            </button>

            {servicesOpen && (
              <div
                className="absolute mt-2 w-64 rounded-xl border shadow-lg z-50 p-3"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <p
                  className="text-xs font-semibold px-3 py-2 text-secondary uppercase tracking-wider"
                  style={{ color: "var(--text-secondary)" }}
                >
                  All Services
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((s) => (
                    <a
                      key={s.name}
                      href={s.path}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-secondary transition group"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                      }}
                    >
                      <span className="text-lg">{s.icon}</span>
                      <span
                        className="text-sm font-medium group-hover:text-accent-primary transition"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {s.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div> */}

          {/* Search */}
          <div
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border flex-1 max-w-sm"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            <Search size={18} style={{ color: "var(--text-secondary)" }} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1 text-sm"
              style={{ color: "var(--text-primary)" }}
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleMode}
            className="p-2 rounded-lg hover:bg-secondary transition"
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? (
              <Sun size={20} style={{ color: "var(--text-primary)" }} />
            ) : (
              <Moon size={20} style={{ color: "var(--text-primary)" }} />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-secondary transition">
            <Bell size={20} style={{ color: "var(--text-primary)" }} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--accent-primary)" }}
            />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "var(--accent-primary)" }}
              >
                A
              </div>
              <span className="text-sm font-medium hidden sm:inline text-primary">
                Admin
              </span>
              <ChevronDown size={16} style={{ color: "var(--text-secondary)" }} />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg border shadow-lg p-2 z-50"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <a
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition"
                >
                  <User size={16} />
                  <span style={{ color: "var(--text-primary)" }} className="text-sm">
                    Profile
                  </span>
                </a>
                <hr style={{ backgroundColor: "var(--border-color)" }} />
                <a
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition text-red-500"
                >
                  <span className="text-sm font-medium">Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
