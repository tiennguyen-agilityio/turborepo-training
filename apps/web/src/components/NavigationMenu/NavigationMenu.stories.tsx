import type { Meta, StoryObj } from "@storybook/nextjs";

import NavigationMenu from ".";
import { NAV_BAR } from "@/constants";

const options = NAV_BAR.map((item) => item.href);

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  argTypes: {
    path: {
      options: ["/", ...options],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  args: {
    list: NAV_BAR,
  },
};

export const Active: Story = {
  args: {
    list: NAV_BAR,
    path: NAV_BAR[1].href,
  },
};
