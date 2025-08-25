import { createTamagui, createTokens } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";

import { radius, size, space, zIndex } from "./metrics";
import { colorsMapping } from "./colors";
import { themes } from "./themes";
import { defaultFont, headingFont } from "./fonts";

const tokens = {
  radius,
  size,
  space,
  zIndex,
};

export const config = createTamagui({
  ...defaultConfig,
  fonts: {
    body: defaultFont,
    heading: headingFont,
  },
  tokens: createTokens({
    ...tokens,
    color: colorsMapping,
  }),
  themes,
});
