import type { Meta, StoryObj } from "@storybook/nextjs";

import { EXPERIENCES } from "@/constants/common";

import Experiences from ".";

const meta: Meta<typeof Experiences> = {
  title: "Components/Experiences",
  component: Experiences,
};

export default meta;

type Story = StoryObj<typeof Experiences>;

export const Default: Story = {
  args: {
    data: EXPERIENCES,
    onItemClick: (index: number) => alert(`Index item: ${index}`),
  },
};
