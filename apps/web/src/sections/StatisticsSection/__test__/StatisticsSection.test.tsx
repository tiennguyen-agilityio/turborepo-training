import { render } from "@testing-library/react";

import StatisticsSection from "..";

describe("StatisticsSection component", () => {
  it("should render correctly", () => {
    const { container } = render(<StatisticsSection />);
    expect(container).toMatchSnapshot();
  });
});
