import { ComponentProps } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { PAGE_SIZE } from "@/constants/common";
import { useLoadMore } from "@/hooks/useLoadMore";

import LocationCard from "@/components/LocationCard";
import Button from "@/components/Button";
import LocationsSection from "..";

jest.mock("@/hooks/useLoadMore");
jest.mock("@/components/LocationCard", () => {
  const MockLocationCard = (props: ComponentProps<typeof LocationCard>) => (
    <div data-testid="location-card">{props.item.name}</div>
  );
  return MockLocationCard;
});

jest.mock("@/components/SkeletonLocationCard", () => {
  const MockSkeletonLocationCard = () => <div data-testid="skeleton-card" />;
  return MockSkeletonLocationCard;
});

jest.mock("@/components/Button", () => {
  const MockButton = (props: ComponentProps<typeof Button>) => (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
  return MockButton;
});

jest.mock("@/components/Loading", () => {
  const MockLoading = () => <div data-testid="loading-icon" />;
  return MockLoading;
});

describe("LocationsSection", () => {
  const mockUseLoadMore = useLoadMore as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders location cards", () => {
    mockUseLoadMore.mockReturnValue({
      data: [
        { id: "1", name: "Location 1" },
        { id: "2", name: "Location 2" },
      ],
      isLoading: false,
      hasMore: true,
      onLoadMore: jest.fn(),
      error: null,
    });

    render(<LocationsSection />);

    expect(screen.getByText("Location 1")).toBeInTheDocument();
    expect(screen.getByText("Location 2")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("renders skeleton cards when loading", () => {
    mockUseLoadMore.mockReturnValue({
      data: [],
      isLoading: true,
      hasMore: true,
      onLoadMore: jest.fn(),
      error: null,
    });

    render(<LocationsSection />);

    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons).toHaveLength(PAGE_SIZE);
  });

  it("calls onLoadMore when Load More is clicked", () => {
    const onLoadMoreMock = jest.fn();

    mockUseLoadMore.mockReturnValue({
      data: [],
      isLoading: false,
      hasMore: true,
      onLoadMore: onLoadMoreMock,
      error: null,
    });

    render(<LocationsSection />);

    fireEvent.click(screen.getByText("Load More"));

    expect(onLoadMoreMock).toHaveBeenCalled();
  });

  it("disables button and shows loading icon when loading", () => {
    mockUseLoadMore.mockReturnValue({
      data: [],
      isLoading: true,
      hasMore: true,
      onLoadMore: jest.fn(),
      error: null,
    });

    render(<LocationsSection />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });

  it("shows error message", () => {
    mockUseLoadMore.mockReturnValue({
      data: [],
      isLoading: false,
      hasMore: false,
      onLoadMore: jest.fn(),
      error: "Something went wrong",
    });

    render(<LocationsSection />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("does not show Load More if hasMore is false", () => {
    mockUseLoadMore.mockReturnValue({
      data: [],
      isLoading: false,
      hasMore: false,
      onLoadMore: jest.fn(),
      error: null,
    });

    render(<LocationsSection />);
    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
  });
});
