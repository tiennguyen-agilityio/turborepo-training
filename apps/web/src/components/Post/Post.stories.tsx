import type { Meta, StoryObj } from "@storybook/nextjs";

import Post from ".";

const meta: Meta<typeof Post> = {
  title: "Components/Post",
  component: Post,
  render: (props) => (
    <div className="w-[545px]">
      <Post {...props} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Post>;

const args = {
  text: "Because the rock was laid down in layers, there is a variation in the hardness of the rock formed. When water runoff trickles across the rock, some areas erode rapidly whereas others hold firm. This variation in erosion speed causes the formation of pinnacles, or “hoodoos” of stable rock.",
  image: "https://i.ibb.co/MFjB1W7/Rectangle-Copy-2.png",
};

export const Default: Story = {
  args: {
    ...args,
    onReadMore: () => alert("Read More click"),
  },
};

export const HideReadMore: Story = {
  args,
};
