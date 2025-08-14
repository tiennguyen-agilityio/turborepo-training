import type { Meta, StoryObj } from "@storybook/nextjs";

import SkeletonLocationCard from ".";

const meta: Meta<typeof SkeletonLocationCard> = {
  title: "Components/SkeletonLocationCard",
  component: SkeletonLocationCard,
};

export default meta;

type Story = StoryObj<typeof SkeletonLocationCard>;

export const Default: Story = {
  args: {},
  render: (props) => (
    <div className="w-[356px]">
      <SkeletonLocationCard {...props} />
    </div>
  ),
};
