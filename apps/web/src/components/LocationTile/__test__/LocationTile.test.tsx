import { render } from "@testing-library/react";

import LocationTile from "..";
import { LOCATION_TILES } from "@/mocks";

describe("LocationTile component", () => {
  const props = {
    ...LOCATION_TILES[0],
  };

  it("should render correctly", () => {
    const { container } = render(<LocationTile {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should render correctly with link", () => {
    const { container } = render(<LocationTile {...props} link="/link" count={undefined} />);

    expect(container).toMatchSnapshot();
  });

  it("should render correctly with default image", () => {
    const { container } = render(
      <LocationTile {...props} imageUrl="" link="/link" count={undefined} />
    );

    expect(container).toMatchSnapshot();
  });
});
