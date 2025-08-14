import { fireEvent, render, screen } from "@testing-library/react";

import { EXPERIENCES } from "@/constants";

import Experiences from "..";

describe("Experiences component", () => {
  const onItemClick = jest.fn();
  const props = {
    data: EXPERIENCES,
    onItemClick,
  };

  it("should render correctly", () => {
    const { container } = render(<Experiences {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with empty label", () => {
    const { container } = render(
      <Experiences
        data={[
          {
            title: EXPERIENCES[0].title,
          },
        ]}
        onItemClick={onItemClick}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("calls onChange with correct index on item click", () => {
    render(<Experiences {...props} onItemClick={onItemClick} />);

    const item = screen.getByText(EXPERIENCES[0].title);
    fireEvent.click(item);

    expect(onItemClick).toHaveBeenCalledWith(0);
  });

  it("does not call onChange when clicking already active item", () => {
    const mockOnItemClick = jest.fn();

    render(<Experiences data={EXPERIENCES} onItemClick={mockOnItemClick} />);

    const item = screen.getByText(EXPERIENCES[0].title);
    fireEvent.click(item);
    fireEvent.click(item);

    expect(mockOnItemClick).toHaveBeenCalledTimes(1);
  });
});
