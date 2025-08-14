import { fireEvent, render, screen } from "@testing-library/react";

import { HOME_VIDEO } from "@/constants";

import VideoPlayer from "..";

describe("VideoPlayer component", () => {
  const props = {
    ...HOME_VIDEO,
    hasPlayed: true,
  };

  let playMock: jest.Mock;
  let pauseMock: jest.Mock;

  beforeEach(() => {
    playMock = jest.fn();
    pauseMock = jest.fn();

    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      value: playMock,
    });

    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
      configurable: true,
      value: pauseMock,
    });

    Object.defineProperty(HTMLMediaElement.prototype, "paused", {
      configurable: true,
      get: () => !playMock.mock.calls.length,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = render(<VideoPlayer {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should render correctly with iconClassName prop", () => {
    const { container } = render(<VideoPlayer {...props} iconClassName="mx-auto" />);

    expect(container).toMatchSnapshot();
  });

  it("should render with auto play", () => {
    const { container } = render(<VideoPlayer {...HOME_VIDEO} autoPlay />);

    expect(container).toMatchSnapshot();
  });

  it("calls play when video is paused and button is clicked", () => {
    render(<VideoPlayer {...props} hasPlayed />);

    const button = screen.getByTestId("btn-icon");
    fireEvent.click(button);

    expect(playMock).toHaveBeenCalled();
  });

  it("calls pause when video is playing and button is clicked", () => {
    render(<VideoPlayer {...props} hasPlayed autoPlay />);

    const button = screen.getByTestId("btn-icon");
    fireEvent.click(button);

    expect(playMock).toHaveBeenCalled();
  });

  it("calls pause when video is playing and button is clicked again", () => {
    let paused = true;

    Object.defineProperty(HTMLMediaElement.prototype, "paused", {
      configurable: true,
      get: () => paused,
    });

    render(<VideoPlayer {...props} hasPlayed />);

    const button = screen.getByTestId("btn-icon");

    // First click to play
    fireEvent.click(button);
    paused = false;

    // Second click to pause
    fireEvent.click(button);

    expect(pauseMock).toHaveBeenCalled();
  });
});
