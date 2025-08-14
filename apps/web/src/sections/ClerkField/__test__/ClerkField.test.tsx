import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ClerkField from "..";
import { ComponentProps } from "react";

jest.mock("@clerk/elements/common", () => ({
  FieldState: ({ children }: { children: (field: { message?: string }) => React.ReactNode }) => {
    return <>{children({ message: "" })}</>;
  },
  Field: ({ children, className }: ComponentProps<"div">) => (
    <div className={className}>{children}</div>
  ),
  Label: ({ children, className }: ComponentProps<"label">) => (
    <label className={className}>{children}</label>
  ),
  Input: (props: ComponentProps<"input">) => <input {...props} data-testid="clerk-input" />,
  FieldError: ({ className }: ComponentProps<"span">) => <span className={className}>Error</span>,
}));

describe("ClerkField", () => {
  it("renders with label and placeholder", () => {
    render(<ClerkField name="email" label="Email" placeholder="Enter your email" />);

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByTestId("clerk-input")).toHaveAttribute("type", "text");
  });

  it("shows toggle button for password field", async () => {
    render(<ClerkField name="password" type="password" />);

    const toggleButton = screen.getByRole("button", { name: /show password/i });
    expect(toggleButton).toBeInTheDocument();

    // toggle visibility
    await userEvent.click(toggleButton);
    expect(screen.getByRole("button", { name: /hide password/i })).toBeInTheDocument();
    expect(screen.getByTestId("clerk-input")).toHaveAttribute("type", "text");
  });

  it("matches snapshot", () => {
    const { container } = render(
      <ClerkField name="username" label="Username" placeholder="Enter username" />
    );
    expect(container).toMatchSnapshot();
  });
});
