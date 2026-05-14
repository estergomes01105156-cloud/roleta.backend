"use client";

import { useState } from "react";

export default function Home() {

  const premios = [
    "R$10",
    "R$50",
    "R$100",
    "R$500",
    "PIX",
    "Bônus",
    "Tente Novamente",
    "R$1000",
  ];

  const [rotacao, setRotacao] = useState(0);
  const [resultado, setResultado] = useState("");
  const [girando, setGirando] = useState(false);

  async function girarRoleta() {

    if (girando) return;

    setGirando(true);

    const resposta = await fetch("http://localhost:3001/girar", {
      method: "POST",
    });

    const data = await resposta.json();

    setRotacao(data.rotacao);

    setTimeout(() => {
      setResultado(data.premio);
      setGirando(false);
    }, 4000);
  }

  return (
    <main className="container">

      <h1>ROLETA PREMIUM</h1>

      <div className="roleta-area">

        <div className="seta"></div>

        <div  className="roleta" style={{
            transform: `rotate(${rotacao}deg)`
        }}>

          {premios.map((premio, index) => {

            const angulo = (360 / premios.length) * index;

            return (
              <div
                key={index}
                className="fatia"
                style={{
                  transform: `rotate(${angulo}deg)`,
                }}
              >
                <span>{premio}</span>
              </div>
            );
          })}

        </div>

      </div>

      <button onClick={girarRoleta}>
        {girando ? "Girando..." : "GIRAR"}
      </button>

      {resultado && <h2>Resultado: {resultado}</h2>}

    </main>
  );
}