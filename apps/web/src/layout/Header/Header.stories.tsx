import type { Meta, StoryObj } from "@storybook/nextjs";
import { ClerkProvider } from "@clerk/nextjs";

import Header from ".";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  render: (props) => (
    <ClerkProvider publishableKey="pk_test_Y2xvc2luZy1nYXRvci0yOS5jbGVyay5hY2NvdW50cy5kZXYk">
      <div className="w-full h-30 items-center">
        <Header {...props} />
      </div>
    </ClerkProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    className: "text-current",
    hasBorderBottom: true,
  },
};
