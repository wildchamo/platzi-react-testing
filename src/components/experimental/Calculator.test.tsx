import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Calculator } from "./Calculator";

describe("<Calculator />", () => {
  // arrange

  const testCases = [
    { a: 1, b: 2, expected: 3, operation: "add" as const },
    { a: 1, b: 2, expected: -1, operation: "subtract" as const },
    { a: 1, b: 2, expected: 2, operation: "multiply" as const },
    { a: 1, b: 2, expected: 0.5, operation: "divide" as const },
  ];

  // act

  it.each(testCases)(
    "debería retornar $expected para $operation con $a y $b",
    ({ a, b, expected, operation }) => {
      render(<Calculator a={a} b={b} operation={operation} />);
      const result = screen.getByText("Result: " + expected);

      // assert

      expect(result).toBeInTheDocument();
    }
  );
});
