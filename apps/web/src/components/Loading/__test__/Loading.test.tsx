import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

// component
import Loading from "..";

describe("Loading test cases", () => {
  it("should render correctly", () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
