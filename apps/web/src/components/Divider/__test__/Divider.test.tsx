import { render } from "@testing-library/react";

import Divider from "..";

describe("Divider component", () => {
  it("should render correctly", () => {
    const { container } = render(<Divider />);
    expect(container).toMatchSnapshot();
  });

  it("should render with text", () => {
    const { container } = render(<Divider text="OR" />);
    expect(container).toMatchSnapshot();
  });
});
