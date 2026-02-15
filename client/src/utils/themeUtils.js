/**
 * Theme utilities and helper functions
 */

export const themeColors = {
  light: {
    background: "#ffffff",
    surface: "#f3f4f6",
    text: "#111827",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    accent: "#22c55e",
    sidebar: "#0f172a",
  },
  dark: {
    background: "#000000",
    surface: "#1a1a1a",
    text: "#f9fafb",
    textSecondary: "#d1d5db",
    border: "#1f2937",
    accent: "#4ade80",
    sidebar: "#050505",
  },
};

export const accentColorMap = {
  green: { light: "#22c55e", dark: "#4ade80" },
  blue: { light: "#3b82f6", dark: "#60a5fa" },
  purple: { light: "#a855f7", dark: "#c084fc" },
  orange: { light: "#f97316", dark: "#fb923c" },
};

/**
 * Get computed style for theme
 */
export function getThemeStyle(isDark, theme) {
  return {
    backgroundColor: isDark ? themeColors.dark.background : themeColors.light.background,
    color: isDark ? themeColors.dark.text : themeColors.light.text,
  };
}

/**
 * Get accent color based on theme mode
 */
export function getAccentColor(isDark, accentColor) {
  return isDark ? accentColor.dark : accentColor.light;
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

/**
 * Calculate contrast ratio for accessibility
 */
export function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const getLuminance = (rgb) => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((x) => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color has good contrast
 */
export function hasGoodContrast(foreground, background, minRatio = 4.5) {
  return getContrastRatio(foreground, background) >= minRatio;
}
