import { createFont } from "tamagui";
import { fontSize, lineHeight } from "./typography";

export const fonts = {
  body: "Abel, Helvetica, Arial, sans-serif",
  heading: "Abel, Helvetica, Arial, sans-serif",
};

export const fontConfig = {
  size: {
    ...fontSize,
    true: 16,
  },
  lineHeight,
};

export const defaultFont = createFont({
  family: fonts.body,
  ...fontConfig,
  weight: {
    4: "400",
    true: "400",
  },
  letterSpacing: {
    1: 0,
    2: -0.5,
    true: 0,
  },
  face: {
    400: {
      normal: "Abel-Regular",
    },
  },
});

export const headingFont = createFont({
  family: fonts.heading,
  ...fontConfig,
  weight: {
    4: "400",
    true: "400",
  },
  face: {
    400: { normal: "Abel-Regular" },
  },
});
