import { fireEvent, render, screen } from "@testing-library/react";

import Button from "..";

describe("Button component", () => {
  const onClick = jest.fn();
  const props = {
    children: "Default",
    onClick,
  };

  it("should render correctly", () => {
    const { container } = render(<Button {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with asChild true", () => {
    const { container } = render(<Button {...props} asChild />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with variant destructive", () => {
    const { container } = render(<Button {...props} variant="destructive" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with variant outline", () => {
    const { container } = render(<Button {...props} variant="outline" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with variant secondary", () => {
    const { container } = render(<Button {...props} variant="secondary" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with variant ghost", () => {
    const { container } = render(<Button {...props} variant="ghost" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with variant link", () => {
    const { container } = render(<Button {...props} variant="link" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with size sm", () => {
    const { container } = render(<Button {...props} size="sm" />);
    expect(container).toMatchSnapshot();
  });

  it("should call onClick when button is clicked", () => {
    render(<Button {...props} />);

    const button = screen.getByText(/Default/i);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shouldn't call onClick when button disabled", () => {
    render(<Button {...props} disabled />);

    const button = screen.getByText(/Default/i);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
