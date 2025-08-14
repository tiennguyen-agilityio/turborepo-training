import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";

import { USER_DROPDOWNS_LENGTH } from "@/constants/nav";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { ROUTES } from "@/constants/routes";

import UserDropdown from "..";

const mockPush = jest.fn();
const mockSignOut = jest.fn();

let mockUser = {
  firstName: "John",
  lastName: "Doe",
  imageUrl: "https://i.ibb.co/cXVN8z3D/avatar-01.png",
};

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => "",
}));

jest.mock("@clerk/nextjs", () => ({
  ...jest.requireActual("@clerk/nextjs"),
  useUser: () => ({
    user: mockUser,
  }),
  useClerk: () => ({
    signOut: mockSignOut,
  }),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

describe("UserDropdown component", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should render correctly", () => {
    const { container } = render(<UserDropdown />);
    expect(container).toMatchSnapshot();
  });

  it("should open dropdown menu and render correct number of items", async () => {
    render(<UserDropdown />);

    await act(async () => {
      userEvent.click(screen.getByTestId("btn-dropdown"));
    });

    const items: HTMLElement[] = await waitFor(() => screen.getAllByTestId("dropdown-menu-item"));

    expect(items).toHaveLength(USER_DROPDOWNS_LENGTH);
  });

  it("should render with default values when user is null", () => {
    jest.mock("@clerk/nextjs", () => ({
      ...jest.requireActual("@clerk/nextjs"),
      useUser: () => ({ user: null }),
    }));

    const { container } = render(<UserDropdown />);
    expect(container).toMatchSnapshot();
  });

  it("should call router.push when clicking first item", async () => {
    render(<UserDropdown />);

    await act(async () => {
      userEvent.click(screen.getByTestId("btn-dropdown"));
    });

    const items: HTMLElement[] = await waitFor(() => screen.getAllByTestId("dropdown-menu-item"));
    fireEvent.click(items[0]);

    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it("should call router.push when clicking first item in menu item", async () => {
    render(<UserDropdown />);

    const items: HTMLElement[] = await waitFor(() => screen.getAllByTestId("menu-item"));
    fireEvent.click(items[0]);

    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it("should apply text-primary class when on user profile page", async () => {
    jest.mock("next/navigation", () => ({
      useRouter: () => ({ push: mockPush }),
      usePathname: () => ROUTES.USER_PROFILE,
    }));

    render(<UserDropdown />);

    const menuItems = await waitFor(() => screen.getAllByTestId("menu-item"));

    const profileItem = menuItems.find((item) => item.className.includes("text-primary"));

    expect(profileItem).toBeInTheDocument();
  });

  it("should not call clicking sign out item(latest item)", async () => {
    render(<UserDropdown />);

    await act(async () => {
      userEvent.click(screen.getByTestId("btn-dropdown"));
    });

    const items: HTMLElement[] = await waitFor(() => screen.getAllByTestId("dropdown-menu-item"));
    fireEvent.click(items[USER_DROPDOWNS_LENGTH - 1]);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should sign out and show success toast when confirming logout", async () => {
    mockSignOut.mockResolvedValueOnce(undefined);

    render(<UserDropdown />);

    await act(async () => {
      userEvent.click(screen.getByTestId("btn-dropdown"));
    });

    const items: HTMLElement[] = await waitFor(() => screen.getAllByTestId("dropdown-menu-item"));
    fireEvent.click(items[USER_DROPDOWNS_LENGTH - 1]);

    const confirmButton = await screen.findByText("Logout");
    expect(confirmButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(SUCCESS_MESSAGES.SIGNED_OUT);
    });
  });

  it("should show error toast when signOut fails", async () => {
    mockSignOut.mockRejectedValueOnce(new Error("fail"));

    render(<UserDropdown />);

    await act(async () => {
      userEvent.click(screen.getByTestId("btn-dropdown"));
    });

    const items: HTMLElement[] = await waitFor(() => screen.getAllByTestId("dropdown-menu-item"));
    fireEvent.click(items[USER_DROPDOWNS_LENGTH - 1]);

    const confirmButton = await screen.findByText("Logout");
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(ERROR_MESSAGES.SIGN_OUT_FAILED);
    });
  });

  it("should render with default values when user is null", () => {
    mockUser = {
      firstName: "",
      lastName: "",
      imageUrl: "",
    };
    const { container } = render(<UserDropdown />);

    expect(container).toBeInTheDocument();
  });
});
