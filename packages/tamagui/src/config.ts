import { createTamagui, createTokens } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";

import { radius, size, space, zIndex } from "./metrics";
import { colorsMapping } from "./colors";
import { themes } from "./themes";
import { defaultFont, headingFont } from "./fonts";
import { media } from "./media";

const tokens = {
  radius,
  size,
  space,
  zIndex,
};

export const config = createTamagui({
  ...defaultConfig,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  fonts: {
    body: defaultFont,
    heading: headingFont,
  },
  defaultFont: "body",
  tokens: createTokens({
    ...tokens,
    color: colorsMapping,
  }),
  themes,
  media: {
    ...defaultConfig.media,
    ...media,
  },
});
