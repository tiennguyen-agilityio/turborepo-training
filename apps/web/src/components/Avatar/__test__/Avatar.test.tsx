import { render } from "@testing-library/react";

import Avatar from "..";

describe("Avatar component", () => {
  const props = {
    src: "https://github.com/shadcn.png",
    name: "TN",
  };
  it("should render correctly", () => {
    const { container } = render(<Avatar {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with default image", () => {
    const { container } = render(<Avatar src="" name="" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly has new activity", () => {
    const { container } = render(<Avatar {...props} isActive alt="Avatar Image" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with fallback", () => {
    const { container } = render(<Avatar {...props} src="" alt="" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with fallback has new activity", () => {
    const { container } = render(<Avatar {...props} src="" isActive />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with size lg", () => {
    const { container } = render(<Avatar {...props} size="lg" />);
    expect(container).toMatchSnapshot();
  });
});
