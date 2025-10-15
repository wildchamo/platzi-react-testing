import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  it("Debería renderizar el botón", () => {
    render(<Button label="Enviar" />);

    const button = screen.getByText("Enviar");

    expect(button).toBeInTheDocument();
  });

  it("Debería ejecutar el onclick!", async () => {
    const handleClick = vi.fn();

    render(<Button label="Enviar" onClick={handleClick} />);

    const button = screen.getByText("Enviar");

    await act(() => {
      fireEvent.click(button);
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
