import { fireEvent, render, screen } from "@testing-library/react";

import Post from "..";

describe("Post component", () => {
  const props = {
    text: "Because the rock was laid down in layers, there is a variation in the hardness of the rock formed. When water runoff trickles across the rock, some areas erode rapidly whereas others hold firm. This variation in erosion speed causes the formation of pinnacles, or “hoodoos” of stable rock.",
    image: "https://i.ibb.co/MFjB1W7/Rectangle-Copy-2.png",
  };

  const onReadMore = jest.fn();

  it("should render correctly", () => {
    const { container } = render(
      <Post {...props} onReadMore={onReadMore} alt="Mountain Vacations" />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly with default image", () => {
    const { container } = render(
      <Post {...props} image="" onReadMore={onReadMore} alt="Mountain Vacations" />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render with onReadMore is not provided", () => {
    const { container } = render(<Post {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("calls onReadMore when Read More button is clicked", () => {
    render(<Post {...props} onReadMore={onReadMore} />);

    const button = screen.getByTestId("readMore");
    fireEvent.click(button);

    expect(onReadMore).toHaveBeenCalledTimes(1);
  });
});
