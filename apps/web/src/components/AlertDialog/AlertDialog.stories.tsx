import type { Meta, StoryObj } from "@storybook/nextjs";

import AlertDialog from ".";
import { useState } from "react";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (value = false) => setIsOpen(value);

    return <AlertDialog {...props} open={isOpen} onOpenChange={handleToggle} />;
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  args: {
    title: "Are you absolutely sure?",
    description:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    textButton: "Click me!",
    textCancel: "Cancel",
    textAction: "Submit",
  },
};
