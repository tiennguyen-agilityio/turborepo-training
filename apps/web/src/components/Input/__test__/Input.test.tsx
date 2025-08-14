import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Input from "..";

describe("Input component", () => {
  const onChange = jest.fn();
  const onFocus = jest.fn();

  const props = {
    label: "Label Input",
    onChange,
    onFocus,
  };

  it("should render default", () => {
    const { container } = render(<Input {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should render with empty label", () => {
    const { container } = render(<Input />);

    expect(container).toMatchSnapshot();
  });

  it("should call onChange event when fill value", () => {
    render(<Input {...props} />);

    const inputElement: HTMLInputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "Value" } });

    expect(onChange).toHaveBeenCalled();
    expect(inputElement?.value).toEqual("Value");
  });

  it("should call onChange event when clear value", () => {
    render(<Input {...props} defaultValue="Value default" />);

    const inputElement: HTMLInputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "" } });

    expect(onChange).toHaveBeenCalled();
    expect(inputElement?.value).toEqual("");
  });

  it("should call onFocus when clicking label", async () => {
    render(<Input {...props} />);

    const label: HTMLLabelElement = screen.getByText(/Label Input/i);
    await userEvent.click(label);

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("should not call onFocus when clicking label with input disabled", async () => {
    render(<Input {...props} disabled />);

    const label: HTMLLabelElement = screen.getByText(/Label Input/i);
    await userEvent.click(label);

    expect(onFocus).toHaveBeenCalledTimes(0);
  });
});
