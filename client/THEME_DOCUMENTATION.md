# Enterprise Dashboard Theme System Documentation

## Overview

This document provides comprehensive information about the modern SaaS Enterprise Dashboard theme system, including setup, customization, and best practices.

## Table of Contents

1. [Architecture](#architecture)
2. [Theme Modes](#theme-modes)
3. [Customization](#customization)
4. [API Reference](#api-reference)
5. [Component Usage](#component-usage)
6. [Storage & Persistence](#storage--persistence)
7. [Best Practices](#best-practices)

---

## Architecture

### File Structure

```
src/
├── context/
│   └── ThemeContext.jsx          # Theme context and provider
├── components/
│   ├── Sidebar.jsx               # Themed sidebar
│   ├── Topbar.jsx                # Themed topbar with theme switcher
│   ├── StatCard.jsx              # Themed stat card
│   └── ThemeSettings.jsx          # Theme settings panel
├── pages/
│   ├── Dashboard.jsx             # Main dashboard
│   └── auth/
│       ├── Login.jsx             # Login page
│       ├── Register.jsx          # Register page
│       └── ForgotPassword.jsx    # Password reset page
├── utils/
│   └── themeUtils.js             # Theme utility functions
├── App.jsx                       # Main app with ThemeProvider
├── index.css                     # CSS variables and global styles
└── DashboardLayout.jsx           # Dashboard layout wrapper
```

### CSS Variables

All theme values are stored as CSS variables for dynamic runtime updates:

```css
--bg-primary         /* Primary background color */
--bg-secondary       /* Secondary background color */
--text-primary       /* Primary text color */
--text-secondary     /* Secondary text color */
--border-color       /* Border color */
--accent-primary     /* Primary accent color */
--sidebar-bg         /* Sidebar background color */
--border-radius      /* Border radius (rounded/sharp) */
```

---

## Theme Modes

### Light Theme (Default)

Ideal for daytime use with high visibility.

```javascript
Light: {
  background: "#ffffff",
  surface: "#f3f4f6",
  text: "#111827",
  textSecondary: "#6b7280",
  border: "#e5e7eb",
  accent: "#22c55e",
  sidebar: "#0f172a",
}
```

### Dark Theme

Ideal for low-light environments with reduced eye strain.

```javascript
Dark: {
  background: "#000000",
  surface: "#1a1a1a",
  text: "#f9fafb",
  textSecondary: "#d1d5db",
  border: "#1f2937",
  accent: "#4ade80",
  sidebar: "#050505",
}
```

---

## Customization

### Available Accent Colors

```javascript
ACCENT_COLORS = {
  GREEN: { name: "green", light: "#22c55e", dark: "#4ade80" },
  BLUE: { name: "blue", light: "#3b82f6", dark: "#60a5fa" },
  PURPLE: { name: "purple", light: "#a855f7", dark: "#c084fc" },
  ORANGE: { name: "orange", light: "#f97316", dark: "#fb923c" },
}
```

### Custom Sidebar Colors

Users can choose from predefined sidebar colors:
- `#0f172a` (Default dark slate)
- `#1e293b` (Light slate)
- `#0c4a6e` (Blue)
- `#1e3a1f` (Green)
- `#3e2723` (Brown)
- `#2d1b4e` (Purple)

### UI Style Options

- **Rounded UI**: `rounded-2xl` (default)
- **Sharp UI**: `rounded-none` or minimal rounding

---

## API Reference

### useTheme Hook

```javascript
import { useTheme } from "./context/ThemeContext";

function MyComponent() {
  const {
    theme,              // Current theme config
    isDark,             // Boolean: true if dark mode
    updateTheme,        // Update theme config
    toggleMode,         // Toggle light/dark mode
    setAccentColor,     // Set accent color
    setSidebarColor,    // Set sidebar color
    toggleRoundedUI,    // Toggle rounded vs sharp
    resetTheme,         // Reset to default
  } = useTheme();

  return (
    <div style={{
      backgroundColor: "var(--bg-primary)",
      color: "var(--text-primary)",
    }}>
      {/* Your content */}
    </div>
  );
}
```

### ThemeProvider

Wrap your entire app with ThemeProvider:

```javascript
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";

function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
```

### Theme Object Structure

```javascript
{
  mode: "light" | "dark",          // THEMES.LIGHT or THEMES.DARK
  accent: {
    name: string,                  // "green", "blue", "purple", "orange"
    light: string,                 // Hex color for light mode
    dark: string,                  // Hex color for dark mode
  },
  sidebarColor: string,            // Hex color
  roundedUI: boolean,              // true for rounded, false for sharp
}
```

---

## Component Usage

### Using Theme in Components

```javascript
import { useTheme } from "../context/ThemeContext";

export default function MyCard() {
  const { isDark } = useTheme();

  return (
    <div
      className="rounded-2xl p-6 border"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <h2 style={{ color: "var(--text-primary)" }}>
        Title
      </h2>
      <p style={{ color: "var(--text-secondary)" }}>
        Description
      </p>
      <button
        style={{ backgroundColor: "var(--accent-primary)" }}
      >
        Action
      </button>
    </div>
  );
}
```

### Conditional Styling

```javascript
{isDark ? (
  <div style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }} />
) : (
  <div style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }} />
)}
```

---

## Storage & Persistence

Theme preferences are automatically persisted to localStorage with the key `app-theme`.

### Manual Storage

```javascript
// Save theme
localStorage.setItem("app-theme", JSON.stringify(theme));

// Load theme
const savedTheme = JSON.parse(localStorage.getItem("app-theme"));
```

### Clearing Theme

```javascript
localStorage.removeItem("app-theme");
```

---

## Best Practices

### 1. Always Use CSS Variables

```javascript
// Good ✅
<div style={{ backgroundColor: "var(--bg-primary)" }} />

// Avoid ❌
<div style={{ backgroundColor: "#ffffff" }} />
```

### 2. Use Semantic Color Names

```javascript
// Good ✅
style={{ color: "var(--text-primary)" }}
style={{ color: "var(--text-secondary)" }}

// Avoid ❌
style={{ color: "#111827" }}
style={{ color: "#6b7280" }}
```

### 3. Ensure Dark Mode Compatibility

Always test components in both light and dark modes:

```javascript
const { isDark } = useTheme();

// Adjust shadows for dark mode
const shadowClass = isDark
  ? "shadow-dark"
  : "shadow-light";
```

### 4. Handle Accent Color Access

```javascript
// Get the right color for current theme mode
const accentColor = isDark
  ? theme.accent.dark
  : theme.accent.light;
```

### 5. Accessibility Considerations

Maintain sufficient contrast ratios:
- **Minimum WCAG AA**: 4.5:1
- **WCAG AAA**: 7:1

Use the utility function to check:

```javascript
import { hasGoodContrast } from "../utils/themeUtils";

const isAccessible = hasGoodContrast(
  textColor,
  backgroundColor
);
```

### 6. Component Pattern

```javascript
export default function Component() {
  const { theme, isDark } = useTheme();

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        borderColor: "var(--border-color)",
        boxShadow: isDark
          ? "0 10px 40px rgba(0,0,0,0.5)"
          : "0 10px 40px rgba(0,0,0,0.08)",
      }}
    >
      Content
    </div>
  );
}
```

---

## Theme Settings Panel

The ThemeSettings component provides a user-friendly interface:

- **Mode Toggle**: Light/Dark
- **Accent Color Picker**: 4 preset colors
- **Sidebar Color Picker**: 6 preset colors
- **UI Style Toggle**: Rounded/Sharp
- **Reset Button**: Return to defaults

### Accessing Theme Settings

Click the floating settings button in the bottom-right corner of the dashboard.

---

## Customization Examples

### Adding a New Accent Color

1. Update `ThemeContext.jsx`:

```javascript
export const ACCENT_COLORS = {
  // ... existing colors
  RED: { name: "red", light: "#ef4444", dark: "#f87171" },
};
```

2. Component will automatically support the new color.

### Adding a New Sidebar Color

1. Update `ThemeSettings.jsx`:

```javascript
const sidebarColorOptions = [
  // ... existing colors
  "#7c2d12", // new brown shade
];
```

### Custom Border Radius

Update `--border-radius` CSS variable:

```javascript
// In ThemeContext.jsx applyTheme function
root.style.setProperty(
  "--border-radius",
  themeConfig.roundedUI ? "0.5rem" : "0.25rem"
);
```

---

## Responsive Design

All components are responsive and work on:
- Mobile (320px - 640px)
- Tablet (641px - 1024px)
- Desktop (1025px+)

Grid layout adapts automatically:

```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Cards adjust based on screen size */}
</div>
```

---

## Performance Optimization

- **CSS Variables**: Faster than inline styles for rapid theme changes
- **Context API**: Prevents unnecessary re-renders with selective updates
- **localStorage**: Eliminates server calls for theme persistence
- **Lazy Loading**: Theme settings panel opens on demand

---

## Troubleshooting

### Theme Not Applying

1. Ensure `ThemeProvider` wraps the entire app
2. Check browser console for CSS variable support
3. Verify localStorage is not disabled

### Colors Not Updating

1. Clear browser cache
2. Check `localStorage.getItem("app-theme")`
3. Ensure `useTheme` hook is called in component

### Dark Mode Not Working

1. Verify `isDark` is correctly computed
2. Check that CSS variables are set on `:root`
3. Ensure no conflicting Tailwind dark mode settings

---

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (14+)
- Mobile browsers: ✅ Full support

CSS variables are supported in all modern browsers since 2015.

---

## Future Enhancements

Planned features:
- [ ] Theme marketplace/sharing
- [ ] More color options
- [ ] Font customization
- [ ] Advanced animations toggle
- [ ] Scheduled theme changes
- [ ] System theme detection

---

## Support & Feedback

For issues or suggestions, contact: support@enterprise-dashboard.com

Last Updated: January 2026
Theme System Version: 1.0.0
