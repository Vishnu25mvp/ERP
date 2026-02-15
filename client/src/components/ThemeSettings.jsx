import { useState } from "react";
import { X, Settings, RotateCcw } from "lucide-react";
import { useTheme, THEMES, ACCENT_COLORS } from "../context/ThemeContext";

export default function ThemeSettings() {
  const [open, setOpen] = useState(false);
  const {
    theme,
    toggleMode,
    setAccentColor,
    setSidebarColor,
    toggleRoundedUI,
    resetTheme,
    isDark,
  } = useTheme();

  const accentOptions = Object.values(ACCENT_COLORS);

  const sidebarColorOptions = [
    "#0f172a", // original dark slate
    "#1e293b", // lighter slate
    "#0c4a6e", // blue
    "#1e3a1f", // green
    "#3e2723", // brown
    "#2d1b4e", // purple
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-accent-primary hover:opacity-90 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition z-40"
        title="Theme Settings"
      >
        <Settings size={20} />
      </button>

      {/* Settings Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-96 bg-primary text-primary shadow-lg z-50 overflow-y-auto transform transition">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-border-color sticky top-0 bg-primary">
              <h2 className="text-lg font-semibold">Theme Settings</h2>
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-secondary rounded-lg p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Mode Toggle */}
              <div>
                <h3 className="font-semibold text-base mb-3">Theme Mode</h3>
                <div className="flex gap-3">
                  <button
                    onClick={toggleMode}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                      theme.mode === THEMES.LIGHT
                        ? "bg-accent-primary text-white"
                        : "bg-secondary text-secondary hover:bg-border-color"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={toggleMode}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                      theme.mode === THEMES.DARK
                        ? "bg-accent-primary text-white"
                        : "bg-secondary text-secondary hover:bg-border-color"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <h3 className="font-semibold text-base mb-3">Accent Color</h3>
                <div className="grid grid-cols-4 gap-3">
                  {accentOptions.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setAccentColor(color)}
                      className={`w-full aspect-square rounded-lg transition border-2 ${
                        theme.accent.name === color.name
                          ? "border-primary"
                          : "border-border-color"
                      }`}
                      style={{
                        backgroundColor: isDark
                          ? color.dark
                          : color.light,
                      }}
                      title={color.name.charAt(0).toUpperCase() +
                        color.name.slice(1)}
                    />
                  ))}
                </div>
                <p className="text-sm text-secondary mt-2">
                  {theme.accent.name.charAt(0).toUpperCase() +
                    theme.accent.name.slice(1)}
                </p>
              </div>

              {/* Sidebar Color */}
              <div>
                <h3 className="font-semibold text-base mb-3">
                  Sidebar Color
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {sidebarColorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSidebarColor(color)}
                      className={`w-full aspect-square rounded-lg transition border-2 ${
                        theme.sidebarColor === color
                          ? "border-accent-primary"
                          : "border-border-color"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* UI Style */}
              <div>
                <h3 className="font-semibold text-base mb-3">
                  UI Style
                </h3>
                <button
                  onClick={toggleRoundedUI}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                    theme.roundedUI
                      ? "bg-accent-primary text-white"
                      : "bg-secondary text-secondary hover:bg-border-color"
                  }`}
                >
                  {theme.roundedUI ? "Rounded" : "Sharp"} UI
                </button>
                <p className="text-sm text-secondary mt-2">
                  Currently using {theme.roundedUI ? "rounded" : "sharp"}{" "}
                  corners
                </p>
              </div>

              {/* Reset */}
              <div className="pt-4 border-t border-border-color">
                <button
                  onClick={() => {
                    resetTheme();
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border-color rounded-lg hover:bg-secondary transition"
                >
                  <RotateCcw size={16} />
                  Reset to Default
                </button>
              </div>

              {/* Info */}
              <div className="bg-secondary p-4 rounded-lg text-sm text-secondary">
                <p>✨ Your theme preferences are automatically saved.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
