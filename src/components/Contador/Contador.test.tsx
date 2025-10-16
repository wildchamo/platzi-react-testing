import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contador } from "./Contador.tsx";

import userEvent from "@testing-library/user-event";

describe("<Contador />", () => {
  it("debería inicial el valor inicial de 0!!!", () => {
    render(<Contador />);
    const contador = screen.getByText("Contador: 0");
    expect(contador).toBeInTheDocument();
  });

  it("debería subir el valor de contador a 1 caundo se le de click!", async () => {
    const user = userEvent.setup();

    render(<Contador />);

    const button = screen.getByTestId("button-test-contador");

    await user.click(button);

    const contador = screen.getByText("Contador: 1");
    expect(contador).toBeInTheDocument();
  });
});
