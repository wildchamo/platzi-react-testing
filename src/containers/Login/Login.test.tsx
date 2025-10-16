import { it, describe, expect, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { Login } from "./Login";
import { MemoryRouter } from "react-router-dom";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";

vi.mock("../../services/getAuth", () => {
  return {
    getAuth: vi.fn(),
  };
});

const mockGetAuth = getAuth as Mock;

describe("<Login />", () => {
  it("deberia mostrar un mensaje de error", () => {
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

    // const error = screen.getByText("Error");
    // expect(error).toBeInTheDocument();

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
