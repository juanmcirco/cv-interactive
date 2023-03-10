import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    setIsLoading(true)
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ human: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
      setIsLoading(false)
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Head>
        <title>CV Manu Barreto</title>
      </Head>

      <main className={styles.main}>
        <h3>CV interactivo de Manu Barreto</h3>
        <p>Siéntete libre de hacerme consultas sobre el CV de Manu Barreto o cualquier pregunta técnica relacionada con sus habilidades y experiencia. Te responderé como si fuera Manu, basándome en sus conocimientos técnicos y en los patrones y principios que él mismo me ha definido. ¡Estoy seguro de que juntos encontraremos el candidato ideal para tu empresa!</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="Human"
            placeholder="Su consulta no molesta 😊"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
            disabled={isLoading}
          />
          <input type="submit" value="Preguntas sobre Manu" disabled={isLoading} />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
