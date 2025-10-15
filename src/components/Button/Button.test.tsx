import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";
import { fireEvent, render, screen, act } from "@testing-library/react";

// arange

// act

// assert
describe("<Button />", () => {
  it("Debería renderizar el botón", () => {
    render(<Button label="Click" />);

    const button = screen.getByText("Click");
    expect(button).toBeInTheDocument();
  });

  it("debería llamar a la función onclick", () => {
    const handleClick = vi.fn();

    render(
      <Button id="button123" label="Click" onClick={() => handleClick()} />
    );

    const button = screen.getByTestId("button123");

    act(() => {
      fireEvent.click(button);
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
