/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme
        "light-bg": "#ffffff",
        "light-text": "#111827",
        "light-border": "#e5e7eb",
        "light-accent": "#22c55e",
        "light-sidebar": "#0f172a",

        // Dark Theme
        "dark-bg": "#000000",
        "dark-text": "#f9fafb",
        "dark-border": "#1f2937",
        "dark-accent": "#4ade80",
        "dark-sidebar": "#050505",

        // Brand colors for custom theme
        "brand-green": "#22c55e",
        "brand-blue": "#3b82f6",
        "brand-purple": "#a855f7",
        "brand-orange": "#f97316",
      },
      borderRadius: {
        "brand-rounded": "var(--border-radius, 1rem)",
      },
      spacing: {
        "sidebar": "18rem",
      },
      fontSize: {
        "xs": ["0.75rem", { lineHeight: "1rem" }],
        "sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "base": ["1rem", { lineHeight: "1.5rem" }],
        "lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
      },
      boxShadow: {
        "brand": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "brand-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
