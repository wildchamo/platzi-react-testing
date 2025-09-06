import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Calculator } from "./Calculator";

describe("<Calculator />", () => {
  const useCasesTest = [
    {
      a: 1,
      b: 2,
      operation: "add",
      expected: 3,
    },
    {
      a: 1,
      b: 2,
      operation: "subtract",
      expected: -1,
    },
    {
      a: 1,
      b: 2,
      operation: "multiply",
      expected: 2,
    },
    {
      a: 1,
      b: 2,
      operation: "divide",
      expected: 0.5,
    },
  ];

  it.each(useCasesTest)(
    "Debería calcular la operación $expected cuando $a y $b son $operation",
    ({ a, b, operation, expected }) => {
      render(<Calculator a={a} b={b} operation={operation} />);
      const result = screen.getByText(`Result: ${expected}`);
      expect(result).toBeInTheDocument();
    }
  );
});
