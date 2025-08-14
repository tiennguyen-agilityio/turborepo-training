import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";

import VideoPlayer from "@/components/VideoPlayer";
import Experiences from "@/components/Experiences";
import Button from "@/components/Button";
import HeroSection from "..";

// Mock constants
jest.mock("@/constants/common", () => ({
  EXPERIENCES: [{ id: 1, title: "Hiking" }],
}));

jest.mock("@/constants/video", () => ({
  HOME_VIDEO: {
    src: "/video.mp4",
    poster: "/poster.jpg",
  },
}));

// Mock components
jest.mock("@/components/VideoPlayer", () => {
  const MockVideoPlayer = (props: ComponentProps<typeof VideoPlayer>) => (
    <div data-testid="video-player">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
  return MockVideoPlayer;
});

jest.mock("@/components/Experiences", () => {
  const MockExperiences = (props: ComponentProps<typeof Experiences>) => (
    <div data-testid="experiences">
      {props.data.map((item, index) => (
        <button
          key={index}
          onClick={() => props.onItemClick(index)}
          data-testid={`button-experience-${index}`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
  return MockExperiences;
});

jest.mock("@/components/Button", () => {
  const MockButton = (props: ComponentProps<typeof Button>) => (
    <button data-testid="find-button" onClick={props.onClick}>
      {props.children}
    </button>
  );
  return MockButton;
});

jest.mock("@/components/Icons/ArrowIcon", () => {
  const MockArrowIcon = () => <span data-testid="arrow-icon" />;
  return MockArrowIcon;
});

describe("HeroSection", () => {
  it("renders video player with title and description", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("video-player")).toBeInTheDocument();
    expect(screen.getByText(/Mother Earth/i)).toBeInTheDocument();
    expect(screen.getByText("Camping Locations")).toBeInTheDocument();
  });

  it("renders experiences list", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("experiences")).toBeInTheDocument();
    expect(screen.getByText("Hiking")).toBeInTheDocument();
  });

  it("renders find experience button with arrow icon", () => {
    render(<HeroSection />);
    const button = screen.getByTestId("find-button");
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
    expect(button).toHaveTextContent("FIND AN EXPERIENCE");
  });

  it("calls handleExperienceClick when button is clicked", () => {
    const { getByTestId } = render(<HeroSection />);
    const button = getByTestId("button-experience-0");

    button.click();
    expect(button).toBeEnabled();
  });

  it("calls handleFindExperience when button is clicked", () => {
    const { getByTestId } = render(<HeroSection />);
    const button = getByTestId("find-button");

    button.click();
    expect(button).toBeEnabled();
  });
});
