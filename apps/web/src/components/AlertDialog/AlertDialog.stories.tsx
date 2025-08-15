import type { Meta, StoryObj } from "@storybook/nextjs";

import AlertDialog, { AlertDialogProps } from ".";
import { useState } from "react";

const AlertDialogWithState = (props: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = (value = false) => setIsOpen(value);

  return <AlertDialog {...props} open={isOpen} onOpenChange={handleToggle} />;
};

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  render: (props) => <AlertDialogWithState {...props} />,
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
