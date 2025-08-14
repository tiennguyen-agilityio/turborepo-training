import { render } from "@testing-library/react";

import SkeletonLocationCard from "..";

describe("SkeletonLocationCard component", () => {
  it("should render correctly", () => {
    const { container } = render(<SkeletonLocationCard />);
    expect(container).toMatchSnapshot();
  });

  it("should render with custom height for image ", () => {
    const { container } = render(<SkeletonLocationCard imageHeight={300} />);
    expect(container).toMatchSnapshot();
  });
});
