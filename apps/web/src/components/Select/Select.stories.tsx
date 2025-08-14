import type { Meta, StoryObj } from "@storybook/nextjs";

import { MONTHS } from "@/constants";

import Select from ".";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    size: {
      options: ["sm", "default"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Label Select",
    placeholder: "Placeholder",
    options: MONTHS,
  },
};

export const EmptyLabel: Story = {
  args: {
    label: "",
    placeholder: "Placeholder",
    options: MONTHS,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label Select",
    options: MONTHS,
    defaultValue: MONTHS[2],
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: "Label Select",
    options: MONTHS,
    size: "sm",
  },
};
