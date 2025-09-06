import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  it("Debería renderizar el botón", () => {
    render(<Button label="Enviar" />);

    const button = screen.getByText("Enviar");

    expect(button).toBeInTheDocument();
  });
});
