import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { OAuthStrategy } from "@/types/auth";

import { ERROR_MESSAGES } from "@/constants/messages";
import SocialButtonsV2 from "..";

// Mocks
jest.mock("@clerk/nextjs", () => ({
  useSignIn: jest.fn(),
  useSignUp: jest.fn(),
}));

const mockAuthenticateWithRedirect = jest.fn();

describe("SocialButtonsV2", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAuth = {
    authenticateWithRedirect: mockAuthenticateWithRedirect,
  };

  const setupMocks = ({ isSignIn }: { isSignIn: boolean }) => {
    const mockSignIn = {
      isLoaded: true,
      signIn: mockAuth,
    };

    const mockSignUp = {
      isLoaded: true,
      signUp: mockAuth,
    };

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useSignIn, useSignUp } = require("@clerk/nextjs");

    useSignIn.mockReturnValue(isSignIn ? mockSignIn : { isLoaded: false, signIn: null });
    useSignUp.mockReturnValue(!isSignIn ? mockSignUp : { isLoaded: false, signUp: null });
  };

  it("renders both Facebook and Google buttons (sign in)", () => {
    setupMocks({ isSignIn: true });

    render(<SocialButtonsV2 isSignIn />);

    expect(screen.getByText("Sign in with Facebook")).toBeInTheDocument();
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });

  it("renders both Facebook and Google buttons (sign up)", () => {
    setupMocks({ isSignIn: false });

    render(<SocialButtonsV2 />);

    expect(screen.getByText("Sign up with Facebook")).toBeInTheDocument();
    expect(screen.getByText("Sign up with Google")).toBeInTheDocument();
  });

  it("calls signIn.authenticateWithRedirect when Facebook button is clicked (sign in)", async () => {
    setupMocks({ isSignIn: true });

    render(<SocialButtonsV2 isSignIn />);

    fireEvent.click(screen.getByText("Sign in with Facebook"));

    await waitFor(() => {
      expect(mockAuthenticateWithRedirect).toHaveBeenCalledWith(
        expect.objectContaining({ strategy: OAuthStrategy.Facebook })
      );
    });
  });

  it("calls signIn.authenticateWithRedirect when Google button is clicked (sign in)", async () => {
    setupMocks({ isSignIn: true });

    render(<SocialButtonsV2 isSignIn />);

    fireEvent.click(screen.getByText("Sign in with Google"));

    await waitFor(() => {
      expect(mockAuthenticateWithRedirect).toHaveBeenCalledWith(
        expect.objectContaining({ strategy: OAuthStrategy.Google })
      );
    });
  });

  it("calls signUp.authenticateWithRedirect when Facebook button is clicked (sign up)", async () => {
    setupMocks({ isSignIn: false });

    render(<SocialButtonsV2 />);

    fireEvent.click(screen.getByText("Sign up with Facebook"));

    await waitFor(() => {
      expect(mockAuthenticateWithRedirect).toHaveBeenCalledWith(
        expect.objectContaining({ strategy: OAuthStrategy.Facebook })
      );
    });
  });

  it("calls signUp.authenticateWithRedirect when Google button is clicked (sign up)", async () => {
    setupMocks({ isSignIn: false });

    render(<SocialButtonsV2 />);

    fireEvent.click(screen.getByText("Sign up with Google"));

    await waitFor(() => {
      expect(mockAuthenticateWithRedirect).toHaveBeenCalledWith(
        expect.objectContaining({ strategy: OAuthStrategy.Google })
      );
    });
  });

  it("shows error message on auth error", async () => {
    mockAuthenticateWithRedirect.mockRejectedValueOnce(new Error(ERROR_MESSAGES.SIGN_IN_FAILED));

    setupMocks({ isSignIn: true });

    render(<SocialButtonsV2 isSignIn />);

    fireEvent.click(screen.getByText("Sign in with Facebook"));

    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGES.SIGN_IN_FAILED)).toBeInTheDocument();
    });
  });

  it("shows error message on auth error", async () => {
    mockAuthenticateWithRedirect.mockRejectedValueOnce(new Error(ERROR_MESSAGES.SIGN_UP_FAILED));

    setupMocks({ isSignIn: false });

    render(<SocialButtonsV2 />);

    fireEvent.click(screen.getByText("Sign up with Facebook"));

    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGES.SIGN_UP_FAILED)).toBeInTheDocument();
    });
  });
});
