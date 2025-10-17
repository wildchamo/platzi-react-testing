import { it, describe, expect, vi, type Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Login } from "./Login";
import { MemoryRouter } from "react-router-dom";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/getAuth", () => {
  return {
    getAuth: vi.fn(),
  };
});

const mockGetAuth = getAuth as Mock;

const LoginComponent = () => {
  return render(
    <SessionProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </SessionProvider>
  );
};

describe("<Login />", () => {
  it("Inputs should be rendered", () => {
    LoginComponent();

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  it("Error state", async () => {
    const user = userEvent.setup();
    mockGetAuth.mockRejectedValueOnce(new Error("Invalid credentials"));
    LoginComponent();

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");

    const buttonLogin = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "wrong username");
    await user.type(passwordInput, "wrong password");
    await user.click(buttonLogin);
    const error = screen.getByText("Invalid credentials");
    expect(error).toBeInTheDocument();
  });

  it("Should redirect to /orders if credentials are correct", async () => {
    const user = userEvent.setup();
    mockGetAuth.mockResolvedValueOnce({
      success: true,
    });

    LoginComponent();

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "validUser");
    await user.type(passwordInput, "validPassword");
    await user.click(buttonLogin);

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith("validUser", "validPassword");
      expect(mockNavigate).toHaveBeenCalledWith("/orders");
    });
  });

  it("Should redirect to /orders if credentials are correct", async () => {
    const user = userEvent.setup();

    LoginComponent();

    const passwordInput = screen.getByTestId("password");
    const buttonTogglePassword = screen.getByTestId("toggle-password");

    await user.type(passwordInput, "validPassword");
    await user.click(buttonTogglePassword);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(buttonTogglePassword.textContent).toBe("hide");
  });
});
