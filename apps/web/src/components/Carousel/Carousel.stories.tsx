import type { Meta, StoryObj } from "@storybook/nextjs";

import Carousel from ".";
import { CAROUSELS } from "@/constants";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    list: CAROUSELS,
  },
  render: (props) => <Carousel {...props} />,
};
