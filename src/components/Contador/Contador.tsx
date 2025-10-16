import { useState } from "react";
export const Contador = () => {
  const [contador, setContador] = useState(0);

  const handleClick = () => {
    setContador((prev) => prev + 1);
  };
  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button data-testid="button-test-contador" onClick={handleClick}>
        Incrementar
      </button>
    </div>
  );
};
