import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

import ExperienceItem, {ExperienceItemProps} from ".";

const ExperienceItemWithState = (props: ExperienceItemProps) => {
  const [value, setValue] = useState("");
  const handleClick = () => setValue("checkout");

  return (
    <ExperienceItem
      {...props}
      isActive={value === "checkout"}
      onClick={handleClick}
    />
  );
}
const meta: Meta<typeof ExperienceItem> = {
  title: "Components/ExperienceItem",
  component: ExperienceItem,
  render: (props) => <ExperienceItemWithState {...props} />,
};

export default meta;

type Story = StoryObj<typeof ExperienceItem>;

export const Default: Story = {
  args: {
    label: "Check out",
    title: "Top Camping Sites",
  },
};

export const OnlyTitle: Story = {
  args: {
    title: "Top Camping Sites",
  },
};
