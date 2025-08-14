import { render } from "@testing-library/react";

import FilterSection from "..";

describe("FilterSection component", () => {
  it("should render correctly", () => {
    const { container } = render(<FilterSection />);
    expect(container).toMatchSnapshot();
  });
});
