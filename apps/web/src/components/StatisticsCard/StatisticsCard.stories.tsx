import type { Meta, StoryObj } from "@storybook/nextjs";

import { STATISTICS_BY_SERVICES } from "@/constants";

import StatisticsCard from ".";

const meta: Meta<typeof StatisticsCard> = {
  title: "Components/StatisticsCard",
  component: StatisticsCard,
};

export default meta;

type Story = StoryObj<typeof StatisticsCard>;

export const Default: Story = {
  args: {
    ...STATISTICS_BY_SERVICES[0],
  },
};
