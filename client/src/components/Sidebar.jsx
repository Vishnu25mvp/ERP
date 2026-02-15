import { NavLink, useNavigate } from "react-router-dom";
import { modules } from "../modules.config";
import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const { theme, isDark } = useTheme();

  const OnLogOut = () => {
    try {
      console.log("User logged out");
      localStorage.removeItem("tk");
      localStorage.removeItem("rtk");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <aside
      className="w-72 h-full text-white flex flex-col border-r"
      style={{
        backgroundColor: theme.sidebarColor,
        borderColor: isDark ? "#1f2937" : "#e5e7eb",
      }}
    >
      {/* Logo */}
      <div
        className="p-6 text-xl font-bold border-b"
        style={{ borderColor: isDark ? "#1f2937" : "rgba(255,255,255,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            A
          </div>
          <span>Aegiiz </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {modules
          .filter((mod) => mod.sideNav)
          .map((mod) => {
            const Icon = mod.icon;

            if (mod.children) {
              return (
                <div key={mod.name}>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === mod.name ? null : mod.name)
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-white/10 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="group-hover:scale-110 transition" />
                      <span className="text-sm font-medium">{mod.name}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition ${
                        openMenu === mod.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openMenu === mod.name && (
                    <div className="ml-8 mt-2 space-y-1 border-l border-white/10 pl-3">
                      {mod.children
                        .filter((child) => child.sideNav)
                        .map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-lg text-sm transition ${
                                isActive
                                  ? "bg-white/20 font-medium"
                                  : "hover:bg-white/10 text-gray-300"
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={mod.path}
                to={mod.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg transition group ${
                    isActive
                      ? "bg-white/20 font-medium"
                      : "hover:bg-white/10"
                  }`
                }
              >
                <Icon size={18} className="group-hover:scale-110 transition" />
                <span className="text-sm font-medium">{mod.name}</span>
              </NavLink>
            );
          })}
      </nav>

      {/* User */}
      <div
        className="p-4 border-t"
        style={{ borderColor: isDark ? "#1f2937" : "rgba(255,255,255,0.1)" }}
      >
        <div className="mb-3">
          <p className="font-medium text-sm">Admin User</p>
          <p className="text-xs text-gray-300">admin@enterprise.com</p>
        </div>

        <button
          onClick={OnLogOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
