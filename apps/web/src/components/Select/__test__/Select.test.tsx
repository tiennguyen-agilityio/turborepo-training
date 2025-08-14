import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { MONTHS } from "@/constants/common";

import Select from "..";

describe("Select component", () => {
  const onValueChange = jest.fn();
  const onOpenChange = jest.fn();

  const props = {
    label: "Label Select",
    placeholder: "Select item",
    options: MONTHS,
    onValueChange,
    onOpenChange,
  };

  it("should render correctly", () => {
    const { container } = render(<Select {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with disabled true", () => {
    const { container } = render(<Select {...props} defaultValue={MONTHS[0]} disabled />);
    expect(container).toMatchSnapshot();
  });

  it("should render with label empty", () => {
    const { container } = render(<Select options={MONTHS} label={undefined} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with size small", () => {
    const { container } = render(<Select {...props} size="sm" />);
    expect(container).toMatchSnapshot();
  });

  it("should renders the correct number of options", async () => {
    render(<Select data-testid="select" {...props} />);

    const select: HTMLSelectElement = screen.getByRole("combobox");
    fireEvent.click(select);
    const items = screen.getAllByRole("option");

    expect(items.length).toBe(MONTHS.length);
    expect(items.map((i) => i.textContent)).toEqual(MONTHS);
  });

  it("should call onOpenChange when click select", async () => {
    render(<Select data-testid="select" options={MONTHS} onOpenChange={onOpenChange} />);

    const select: HTMLSelectElement = screen.getByRole("combobox");
    fireEvent.click(select);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it("should not call onOpenChange when clicking select with disabled", async () => {
    render(<Select data-testid="select" options={MONTHS} onOpenChange={onOpenChange} disabled />);

    const select: HTMLSelectElement = screen.getByRole("combobox");
    fireEvent.click(select);

    expect(onOpenChange).toHaveBeenCalledTimes(0);
  });

  it("should call onOpenChange when click select", async () => {
    render(<Select data-testid="select" options={MONTHS} onOpenChange={onOpenChange} />);

    const select: HTMLSelectElement = screen.getByRole("combobox");
    fireEvent.click(select);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("should call onValueChange when selecting an option", () => {
    render(
      <Select
        data-testid="select"
        options={MONTHS}
        onValueChange={onValueChange}
        onOpenChange={onOpenChange}
      />
    );

    const select: HTMLSelectElement = screen.getByRole("combobox");
    fireEvent.click(select);
    const items = screen.getAllByRole("option");
    fireEvent.click(items[1]);

    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it("should call onValueChange the correct when selected an option", async () => {
    const onValueChange = jest.fn();
    render(
      <Select
        data-testid="select"
        options={MONTHS}
        onValueChange={onValueChange}
        onOpenChange={onOpenChange}
      />
    );

    const select: HTMLSelectElement = screen.getByRole("combobox");
    fireEvent.click(select);
    const items = screen.getAllByRole("option");

    await waitFor(() => fireEvent.click(items[2]));
    expect(onValueChange).toHaveBeenCalledWith(MONTHS[2]);
  });
});
