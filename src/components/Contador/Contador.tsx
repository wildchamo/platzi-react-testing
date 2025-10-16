import { useState } from "react";
export const Contador = () => {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button
        data-testid="button-test-contador"
        onClick={() => setContador(contador + 1)}
      >
        Incrementar
      </button>
    </div>
  );
};
