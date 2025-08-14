import { render } from "@testing-library/react";

import { LocationItem } from "@/types/location";
import { LOCATIONS } from "@/mocks";

import LocationCard from "..";

describe("LocationCard component", () => {
  const props = {
    item: LOCATIONS[0],
    href: "",
  };

  it("should render correctly", () => {
    const { container } = render(<LocationCard {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with default value", () => {
    const { container } = render(<LocationCard item={{} as LocationItem} />);
    expect(container).toMatchSnapshot();
  });
});
