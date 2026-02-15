import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ThemeSettings from "./components/ThemeSettings";
import { Outlet } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

export default function DashboardLayout() {
  const { isDark, theme } = useTheme();

  return (
    <div 
      className="flex min-h-screen"
      style={{
        backgroundColor: isDark ? "#000000" : "#ffffff",
        color: isDark ? "#f9fafb" : "#111827",
      }}
    >
      {/* Fixed Sidebar */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-72 overflow-y-auto"
        style={{
          backgroundColor: theme.sidebarColor,
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content with Sidebar Offset */}
      <div className="flex flex-col flex-1 ml-72">
        {/* Fixed Topbar */}
        <div className="fixed top-0 right-0 left-72 z-40">
          <Topbar />
        </div>

        {/* Scrollable Main Content */}
        <main 
          className="flex-1 mt-20 p-6 transition-colors duration-300"
          style={{
            backgroundColor: isDark ? "#000000" : "#ffffff",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* <ThemeSettings /> */}
    </div>
  );
}
