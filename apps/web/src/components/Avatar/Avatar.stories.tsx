import type { Meta, StoryObj } from "@storybook/nextjs";

import Avatar from ".";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      options: ["default", "lg"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "",
    name: "",
  },
};

export const HasImage: Story = {
  args: {
    src: "https://github.com/shadcn.png",
    name: "TN",
    isActive: true,
  },
};

export const Activity: Story = {
  args: {
    src: "https://github.com/shadcn.png",
    name: "TN",
    isActive: true,
  },
};

export const Fallback: Story = {
  args: {
    name: "TN",
  },
};

export const FallbackActivity: Story = {
  args: {
    name: "TN",
    isActive: true,
  },
};

export const SizeLarge: Story = {
  args: {
    src: "https://github.com/shadcn.png",
    name: "TN",
    size: "lg",
  },
};
