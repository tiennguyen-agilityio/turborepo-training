import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { NAV_BAR } from "@/constants/nav";

import NavigationMenu from "..";

describe("NavigationMenu", () => {
  it("should render correctly", () => {
    const { container } = render(<NavigationMenu list={NAV_BAR} />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly Activities", () => {
    const { container } = render(<NavigationMenu list={NAV_BAR} path={NAV_BAR[0].href} />);
    expect(container).toMatchSnapshot();
  });

  it("should renders the correct number of item", async () => {
    render(<NavigationMenu list={NAV_BAR} path={NAV_BAR[0].href} />);

    const menu: HTMLElement = screen.getByTestId("menu");

    expect(menu.children.length).toBe(NAV_BAR.length);
  });

  it("should apply active class to the current path", () => {
    render(<NavigationMenu list={NAV_BAR} path={NAV_BAR[0].href} />);

    const activeItem = screen.getByText(NAV_BAR[0].name);
    expect(activeItem).toHaveClass("text-primary");

    const inactiveItem = screen.getByText(NAV_BAR[1].name);
    expect(inactiveItem).not.toHaveClass("text-primary");
  });
});
