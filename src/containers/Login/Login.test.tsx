import { it, describe, expect, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { Login } from "./Login";
import { MemoryRouter } from "react-router-dom";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";
import userEvent from "@testing-library/user-event";

vi.mock("../../services/getAuth", () => {
  return {
    getAuth: vi.fn(),
  };
});

const mockGetAuth = getAuth as Mock;

describe("<Login />", () => {
  it("Inputs should be rendered", () => {
    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );

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
    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");

    const buttonLogin = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "test");
    await user.type(passwordInput, "test");
    await user.click(buttonLogin);
    const error = screen.getByText("Invalid credentials");
    expect(error).toBeInTheDocument();
  });
});
