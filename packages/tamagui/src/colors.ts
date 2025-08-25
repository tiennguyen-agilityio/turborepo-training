export const colors = {
  primary: "#5ECE7B",
  dark: "#1D1F22",
  light: "#FFFFFF",
  notification: "#FF3B30",
} as const;

export const backgroundColors = {
  backgroundPrimary: "#5ECE7B",
  backgroundSecondary: "#F1F2F3",
  backgroundHover: "#eaeaea",
  backgroundOverlay: "rgba(0, 0, 0, 0.502)",
} as const;

export const textColors = {
  textPrimary: "#000000",
  textReversal: "#FFFFFF",
  textHelper: "#A3A5AD",
} as const;

export const statusColors = {
  error: "#C82424",
  info: "#4a90e2",
  success: "#15B873",
  warning: "#B7791D",
} as const;

export const borderColors = {
  borderPrimary: "#F1F2F4",
} as const;

export const colorsMapping = {
  ...colors,
  ...backgroundColors,
  ...textColors,
  ...statusColors,
  ...borderColors,
};
