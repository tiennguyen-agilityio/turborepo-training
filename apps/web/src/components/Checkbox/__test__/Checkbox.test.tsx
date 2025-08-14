import { render, screen, fireEvent } from "@testing-library/react";

import Checkbox from "..";

describe("Checkbox component", () => {
  const onCheckedChange = jest.fn();

  const props = {
    label: "Label checkbox",
    onCheckedChange,
  };
  it("should render correctly", () => {
    const { container } = render(<Checkbox {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with disabled true", () => {
    const { container } = render(<Checkbox {...props} disabled />);
    expect(container).toMatchSnapshot();
  });

  it("should render with label empty", () => {
    const { container } = render(<Checkbox />);
    expect(container).toMatchSnapshot();
  });

  it("should render with size large", () => {
    const { container } = render(<Checkbox {...props} size="lg" />);
    expect(container).toMatchSnapshot();
  });

  it("should call onCheckedChange with value true when defaultChecked true", () => {
    render(<Checkbox {...props} defaultChecked />);
    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("shouldn't call onCheckedChange when disabled", () => {
    render(<Checkbox {...props} disabled />);

    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalledTimes(0);
  });

  it("should calls onCheckedChange when toggled", () => {
    render(<Checkbox {...props} />);

    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalledTimes(1);

    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });

  it("should calls onCheckedChange when click label", () => {
    render(<Checkbox {...props} />);

    const label = screen.getByText(/Label checkbox/i);
    fireEvent.click(label);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });
});
