import React from "react";
import { render } from "@testing-library/react";

import DiscoverSection from "..";
import { CarouselItem } from "@/types/carousel";

// Mock carousel data
jest.mock("@/constants/carousel", () => ({
  CAROUSELS: [
    {
      id: "1",
      title: "Discover 1",
      description: "Description 1",
      image: "https://example.com/1.png",
    },
    {
      id: "2",
      title: "Discover 2",
      description: "Description 2",
      image: "https://example.com/2.png",
    },
  ],
}));

jest.mock("@/components/Carousel", () => {
  const MockCarousel = ({ list }: { list: CarouselItem[] }) => (
    <div>
      {list.map((item: CarouselItem) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <img src={item.image} alt={item.title} />
        </div>
      ))}
    </div>
  );
  MockCarousel.displayName = "MockCarousel";
  return MockCarousel;
});

describe("DiscoverSection", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<DiscoverSection />);
    expect(container).toMatchSnapshot();
  });
});
