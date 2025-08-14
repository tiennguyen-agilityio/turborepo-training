import type { Meta, StoryObj } from "@storybook/nextjs";

import Input from ".";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    size: {
      options: ["sm", "default", "lg"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const InputWithLabel: Story = {
  args: {
    label: "Label Input",
  },
};
