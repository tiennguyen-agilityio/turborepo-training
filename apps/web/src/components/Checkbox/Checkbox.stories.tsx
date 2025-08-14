import type { Meta, StoryObj } from "@storybook/nextjs";

import Checkbox from ".";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      options: ["sm", "default", "lg"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Label checkbox",
  },
};

export const EmptyLabel: Story = {
  args: {
    label: "",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label checkbox",
    disabled: true,
  },
};

export const LargeSize: Story = {
  args: {
    label: "Label checkbox",
    size: "lg",
  },
};
