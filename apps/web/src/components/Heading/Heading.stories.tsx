import type { Meta, StoryObj } from "@storybook/nextjs";

import Heading from ".";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  argTypes: {
    as: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: "Heading",
  },
};

export const H1: Story = {
  args: {
    children: "Heading 1",
    as: "h1",
  },
};

export const H2: Story = {
  args: {
    children: "Heading 2",
    as: "h2",
  },
};

export const H3: Story = {
  args: {
    children: "Heading 3",
    as: "h3",
  },
};

export const H4: Story = {
  args: {
    children: "Heading 4",
    as: "h4",
  },
};

export const H5: Story = {
  args: {
    children: "Heading 5",
    as: "h5",
  },
};

export const H6: Story = {
  args: {
    children: "Heading 6",
    as: "h6",
  },
};
