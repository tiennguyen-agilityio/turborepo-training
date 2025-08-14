import type { Meta, StoryObj } from "@storybook/nextjs";

import LocationTile from ".";
import { LOCATION_TILES } from "@/mocks/location";

const meta: Meta<typeof LocationTile> = {
  title: "Components/LocationTile",
  component: LocationTile,
};

export default meta;

type Story = StoryObj<typeof LocationTile>;

export const Default: Story = {
  args: {
    ...LOCATION_TILES[0],
  },
  render: (props) => (
    <div className="w-100 h-50">
      <LocationTile {...props} />
    </div>
  ),
};
