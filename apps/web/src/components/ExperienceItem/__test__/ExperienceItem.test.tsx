import { fireEvent, render, screen } from "@testing-library/react";

import ExperienceItem from "..";

describe("ExperienceItem component", () => {
  const onClick = jest.fn();
  const props = {
    label: "Check out",
    title: "Top Camping Sites",
    onClick,
  };

  it("should render correctly", () => {
    const { container } = render(<ExperienceItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with only title", () => {
    const { container } = render(<ExperienceItem title="Top Camping Sites" />);
    expect(container).toMatchSnapshot();
  });

  it("should render with active true", () => {
    const { container } = render(<ExperienceItem {...props} isActive />);
    expect(container).toMatchSnapshot();
  });

  it("should call onClick when title is clicked", () => {
    render(<ExperienceItem {...props} />);

    const button = screen.getByText(/Top Camping Sites/i);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
