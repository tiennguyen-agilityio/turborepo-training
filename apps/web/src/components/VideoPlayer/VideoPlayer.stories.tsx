import type { Meta, StoryObj } from "@storybook/nextjs";

import VideoPlayer from ".";
import { HOME_VIDEO } from "@/constants/video";

const meta: Meta<typeof VideoPlayer> = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  render: (props) => (
    <div className="w-[600px]">
      <VideoPlayer {...props} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    ...HOME_VIDEO,
    hasPlayed: true,
  },
};

export const AutoPlay: Story = {
  args: {
    ...HOME_VIDEO,
    autoPlay: true,
  },
};
