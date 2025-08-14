import type { Meta, StoryObj } from "@storybook/nextjs";

import { Filter } from "@/types/common";

import FilterSection from ".";

const meta: Meta<typeof FilterSection> = {
  title: "Components/FilterSection",
  component: FilterSection,
};

export default meta;

type Story = StoryObj<typeof FilterSection>;

export const Default: Story = {
  args: {
    defaultValue: {
      budget: [1200, 10000],
      locations: [],
      categories: [],
    },
    onChange: (value: Filter) => {
      alert(`Change Value: ${JSON.stringify(value)}`);
    },
  },
};
