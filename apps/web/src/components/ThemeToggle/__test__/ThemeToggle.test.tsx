import { ComponentProps } from "react";
import { useTheme } from "next-themes";
import { render, screen, fireEvent } from "@testing-library/react";

import ThemeToggle from "..";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@/components/ui", () => ({
  Button: ({ children, ...props }: ComponentProps<"button">) => (
    <button {...props}>{children}</button>
  ),
  DropdownMenu: ({ children }: ComponentProps<"div">) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: ComponentProps<"div">) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: ComponentProps<"div">) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: ComponentProps<"div">) => (
    <div role="menuitem" onClick={onClick}>
      {children}
    </div>
  ),
}));

jest.mock("@/components/Icons/MoonIcon", () => {
  const MockMoonIcon = () => <span>🌙</span>;
  MockMoonIcon.displayName = "MockMoonIcon";
  return MockMoonIcon;
});

jest.mock("@/components/Icons/SunIcon", () => {
  const MockSunIcon = () => <span>☀️</span>;
  MockSunIcon.displayName = "MockSunIcon";
  return MockSunIcon;
});

describe("ThemeToggle", () => {
  const setThemeMock = jest.fn();
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SunIcon when theme is light default", () => {
    mockUseTheme.mockReturnValue({
      theme: undefined,
      resolvedTheme: undefined,
      setTheme: setThemeMock,
    });

    const { container } = render(<ThemeToggle />);
    expect(container).toMatchSnapshot();
  });

  it("renders SunIcon when theme is light", () => {
    mockUseTheme.mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      setTheme: setThemeMock,
    });

    const { container } = render(<ThemeToggle />);
    expect(container).toMatchSnapshot();
  });

  it("renders MoonIcon when theme is dark", () => {
    mockUseTheme.mockReturnValue({
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: setThemeMock,
    });

    const { container } = render(<ThemeToggle />);
    expect(container).toMatchSnapshot();
  });

  it("renders MoonIcon when theme is system", () => {
    mockUseTheme.mockReturnValue({
      theme: "system",
      resolvedTheme: "dark",
      setTheme: setThemeMock,
    });

    const { container } = render(<ThemeToggle />);
    expect(container).toMatchSnapshot();
  });

  it("calls setTheme when dropdown items are clicked", () => {
    mockUseTheme.mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("menuitem", { name: "Light" }));
    expect(setThemeMock).toHaveBeenCalledWith("light");

    fireEvent.click(screen.getByRole("menuitem", { name: "Dark" }));
    expect(setThemeMock).toHaveBeenCalledWith("dark");

    fireEvent.click(screen.getByRole("menuitem", { name: "System" }));
    expect(setThemeMock).toHaveBeenCalledWith("system");
  });

  it("toggles theme with mobile button", () => {
    mockUseTheme.mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("toggles theme from dark to light", () => {
    mockUseTheme.mockReturnValue({
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});
