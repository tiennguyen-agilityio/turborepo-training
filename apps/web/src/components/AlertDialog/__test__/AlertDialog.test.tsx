import { fireEvent, render, screen } from "@testing-library/react";

import AlertDialog from "..";

describe("AlertDialog component", () => {
  const handleCancel = jest.fn();
  const handleAction = jest.fn();
  const handleOpenChange = jest.fn();

  const props = {
    title: "Are you absolutely sure?",
    description:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    textButton: "Click me!",
    textCancel: "Cancel",
    textAction: "Submit",
    onOpenChange: handleOpenChange,
    onClickCancel: handleCancel,
    onClickAction: handleAction,
  };

  it("should render correctly", () => {
    const { container } = render(<AlertDialog title="Are you absolutely sure?" />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with full props", () => {
    const { container } = render(<AlertDialog {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should disable buttons when isLoading is true", () => {
    render(<AlertDialog {...props} isLoading open />);

    expect(screen.getByTestId("btn-cancel")).toBeDisabled();
    expect(screen.getByTestId("btn-continue")).toBeDisabled();
  });

  it("should call onOpenChange when buttons are clicked", async () => {
    render(<AlertDialog {...props} />);

    const buttonConform = screen.getByTestId("btn-confirm");
    fireEvent.click(buttonConform);

    expect(handleOpenChange).toHaveBeenCalledTimes(1);
  });

  it("should call onClickCancel when buttons are clicked", async () => {
    render(<AlertDialog {...props} open />);

    const btnCancel = screen.getByTestId("btn-cancel");
    fireEvent.click(btnCancel);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onClickAction when buttons are clicked", async () => {
    render(<AlertDialog {...props} open />);

    const btnConfirm = screen.getByTestId("btn-continue");
    fireEvent.click(btnConfirm);

    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
