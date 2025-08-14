import { render } from "@testing-library/react";

import Logo from "..";

describe("Logo component", () => {
  const props = {
    text: "Travelsy",
  };

  it("should render correctly", () => {
    const { container } = render(<Logo {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with custom text", () => {
    const { container } = render(<Logo text="MyLogo" />);
    expect(container).toMatchSnapshot();
  });

  it("applies custom className", () => {
    const { container } = render(<Logo className="text-red-500" />);
    expect(container).toMatchSnapshot();
  });
});
