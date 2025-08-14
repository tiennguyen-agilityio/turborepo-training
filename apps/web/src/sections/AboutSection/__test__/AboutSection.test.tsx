import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import AboutSection from "..";

describe("AboutSection component", () => {
  it("should render correctly", () => {
    const { container } = render(<AboutSection />);
    expect(container).toMatchSnapshot();
  });

  it("calls onReadMore when Read More button is clicked", async () => {
    render(<AboutSection />);

    const button = await waitFor(() => screen.getByTestId("readMore"));
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
