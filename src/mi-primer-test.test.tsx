import { describe, it, expect } from "vitest";

describe("mi primer test", () => {
  it("la suma de dos números", () => {
    const suma = (a: number, b: number) => a + b;
    const res = suma(1, 1);
    expect(res).toBe(2);
  });

  it("dos textos iguales", () => {
    const texto1 = "platzi conf 2025";
    const texto2 = "platzi conf 2025";
    expect(texto1).toBe(texto2);
  });
});
