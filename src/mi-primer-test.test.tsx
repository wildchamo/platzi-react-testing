import { describe, it, expect } from "vitest";

describe("mi primer test", () => {
  it("la suma de dos números", () => {
    const suma = (a: number, b: number) => a + b;
    const res = suma(1, 1);
    expect(res).toBe(2);
  });
});
