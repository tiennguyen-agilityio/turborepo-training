import { render } from "@testing-library/react";

import ServicesSection from "..";

describe("ServicesSection component", () => {
  it("should render correctly", () => {
    const { container } = render(<ServicesSection />);
    expect(container).toMatchSnapshot();
  });
});
