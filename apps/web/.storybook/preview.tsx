import type { Preview } from "@storybook/nextjs";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { withThemeByClassName } from "@storybook/addon-themes";

import { abel } from "../src/config";
import { ThemeProvider } from "../src/themes/ThemeProvider";
import "../src/themes/theme.css";
import "./preview.css";

const mockRouter: AppRouterInstance = {
  push: async () => true,
  replace: async () => true,
  refresh: () => {},
  forward: () => {},
  back: () => {},
  prefetch: async () => {},
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "light", icon: "circle", title: "Light" },
        { value: "dark", icon: "circle", title: "Dark" },
      ],
      showName: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
  tags: ["autodocs"],
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),

    (Story, context) => {
      const theme = context.globals.theme || "light";
      return (
        <AppRouterContext.Provider value={mockRouter}>
          <ThemeProvider
            attribute="class"
            defaultTheme={theme}
            enableSystem={true}
            disableTransitionOnChange
          >
            <div className={abel.variable}>
              <Story />
            </div>
          </ThemeProvider>
        </AppRouterContext.Provider>
      );
    },
  ],
};

export default preview;
