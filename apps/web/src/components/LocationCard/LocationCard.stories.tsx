import type { Meta, StoryObj } from "@storybook/nextjs";

import LocationCard from ".";
import { LOCATIONS } from "@/mocks/location";

const meta: Meta<typeof LocationCard> = {
  title: "Components/LocationCard",
  component: LocationCard,
};

export default meta;

type Story = StoryObj<typeof LocationCard>;

export const Default: Story = {
  args: {
    item: LOCATIONS[0],
    href: "",
  },
  render: (props) => (
    <div className="w-[356px]">
      <LocationCard {...props} />
    </div>
  ),
};
