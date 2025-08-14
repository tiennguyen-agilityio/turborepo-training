import { render } from "@testing-library/react";

import Heading from "..";

describe("Heading component", () => {
  it("should render correctly", () => {
    const { container } = render(<Heading>Heading</Heading>);

    expect(container).toMatchSnapshot();
  });

  it("renders with h2", () => {
    const { container } = render(<Heading as="h2">Heading 2</Heading>);
    expect(container).toMatchSnapshot();
  });

  it("renders with h3", () => {
    const { container } = render(<Heading as="h3">Heading 3</Heading>);
    expect(container).toMatchSnapshot();
  });

  it("renders with h4", () => {
    const { container } = render(<Heading as="h4">Heading 4</Heading>);
    expect(container).toMatchSnapshot();
  });

  it("renders with h5", () => {
    const { container } = render(<Heading as="h5">Heading 5</Heading>);
    expect(container).toMatchSnapshot();
  });

  it("renders with h6", () => {
    const { container } = render(<Heading as="h6">Heading 6</Heading>);
    expect(container).toMatchSnapshot();
  });
});
