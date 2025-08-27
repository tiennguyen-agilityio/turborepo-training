export const lightTheme = {
  background: "oklch(1 0 0)",
  color: "#000000",
  foreground: "oklch(0.145 0 0)",

  card: "oklch(1 0 0)",
  cardForeground: "oklch(0.145 0 0)",

  popover: "oklch(1 0 0)",
  popoverForeground: "oklch(0.145 0 0)",

  primary: "oklch(67.27% 0.22 38.09)",
  primaryForeground: "oklch(0.985 0 0)",

  secondary: "oklch(0.97 0 0)",
  secondaryForeground: "oklch(0.205 0 0)",

  muted: "oklch(0.97 0 0)",
  mutedForeground: "oklch(0.556 0 0)",

  accent: "oklch(0.97 0 0)",
  accentForeground: "oklch(67.27% 0.22 38.09)",

  border: "oklch(0.922 0 0)",
  input: "oklch(0.922 0 0)",
  ring: "oklch(0.708 0 0)",

  chart1: "oklch(0.646 0.222 41.116)",
  chart2: "oklch(53.2% 0.072 198.97)",
  chart3: "oklch(0.398 0.07 227.392)",
  chart4: "oklch(0.828 0.189 84.429)",
  chart5: "oklch(0.769 0.188 70.08)",

  sidebar: "oklch(0.985 0 0)",
  sidebarForeground: "oklch(0.145 0 0)",
  sidebarPrimary: "oklch(67.27% 0.22 38.09)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarAccent: "oklch(0.97 0 0)",
  sidebarAccentForeground: "oklch(67.27% 0.22 38.09)",
  sidebarBorder: "oklch(0.922 0 0)",
  sidebarRing: "oklch(0.708 0 0)",

  error: "oklch(58.53% 0.205 25.25)",
  success: "oklch(51.25% 0.157 143.38)",
  info: "oklch(64.6% 0.142 253.92)",
  warning: "oklch(0.769 0.188 70.08)",

  facebook: "oklch(47.24% 0.108 263.58)",
  google: "oklch(58.53% 0.205 25.25)",
  link: "oklch(64.6% 0.142 253.92)",
};

export const darkTheme = {
  background: "oklch(0.145 0 0)",
  color: "#ffffff",
  foreground: "oklch(0.985 0 0)",

  card: "oklch(0.205 0 0)",
  cardForeground: "oklch(0.985 0 0)",

  popover: "oklch(0.205 0 0)",
  popoverForeground: "oklch(0.985 0 0)",

  primary: "oklch(58% 0.233 277.117)",
  primaryForeground: "oklch(96% 0.018 272.314)",

  secondary: "oklch(0.269 0 0)",
  secondaryForeground: "oklch(0.985 0 0)",

  muted: "oklch(0.269 0 0)",
  mutedForeground: "oklch(0.708 0 0)",

  accent: "oklch(0.269 0 0)",
  accentForeground: "oklch(58% 0.233 277.117)",

  border: "oklch(1 0 0 / 10%)",
  input: "oklch(1 0 0 / 15%)",
  ring: "oklch(0.556 0 0)",

  chart1: "oklch(58% 0.233 277.117)",
  chart2: "oklch(77% 0.152 181.912)",
  chart3: "oklch(0.769 0.188 70.08)",
  chart4: "oklch(0.627 0.265 303.9)",

  sidebar: "oklch(0.205 0 0)",
  sidebarForeground: "oklch(0.985 0 0)",
  sidebarPrimary: "oklch(0.488 0.243 264.376)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarAccent: "oklch(0.269 0 0)",
  sidebarAccentForeground: "oklch(58% 0.233 277.117)",
  sidebarBorder: "oklch(1 0 0 / 10%)",
  sidebarRing: "oklch(0.556 0 0)",

  error: "oklch(71% 0.194 13.428)",
  success: "oklch(76% 0.177 163.223)",
  info: "oklch(74% 0.16 232.661)",
  warning: "oklch(82% 0.189 84.429)",

  facebook: "oklch(47.24% 0.108 263.58)",
  google: "oklch(58.53% 0.205 25.25)",
  link: "oklch(64.6% 0.142 253.92)",
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
