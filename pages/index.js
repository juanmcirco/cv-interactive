import Head from "next/head";
import { useState } from "react";

import styles from "./index.module.css";
import Manu from './assets/manu.svg';

export default function Home({ passEnv }) {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState();
  const [lang, setLang] = useState('ENG');
  const [passwordInputLength, setPasswordInputLength] = useState(0);
  async function onSubmit(event) {
    setIsLoading(true)
    event.preventDefault();
    try {
      const response = await fetch(lang === 'SPA' ? '/api/generate' : '/api/generate-eng', {
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
  const handlePass = (event) => {
    setPasswordInputLength(event.target.value.length);
    if (event.target.value === passEnv) {
      setPass(event.target.value)
    }
  }
  const handleLang = (langValue) => {
    setLang(langValue)
  }

  return (
    <div>
      <Head>
        <title>CV Manu Barreto</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.manu}>
          <Manu />
        </div>
        <h3>
          {lang === 'SPA' ?
            'CV interactivo de Manu Barreto'
            :
            'Interactive Resume of Manu Barreto'
          }
        </h3>
        <div className={styles.btnsLang}>
          <span onClick={() => handleLang('ENG')} className={lang === 'ENG' && styles.btnSelected}>English</span> | <span onClick={() => handleLang('SPA')} className={lang === 'SPA' && styles.btnSelected}>Español</span>
        </div>
        {!pass &&
          <>
            {(passwordInputLength > 5 && passwordInputLength <= 15) && <div className={styles.disclaimer}> {lang === 'SPA' ? 'Mmm me parece que no tenes la password' : "Mmm, it seems to me that you don't have the password."}</div>}
            {passwordInputLength >= 15 && <div className={styles.disclaimer}>{lang === 'SPA' ? 'Mmm Dejaría de probar, no vas a llegar a nada...' : "Mmm, I would stop trying, you won't get anywhere..."}</div>}
            <input type="password" placeholder="Pass?" onChange={handlePass} />
          </>
        }
        {pass &&
          <>
            {!result &&
              <p>
                {lang === 'SPA' ?
                  "Siéntete libre de hacerme consultas sobre el CV de Manu Barreto o cualquier pregunta técnica relacionada con sus habilidades y experiencias. Te responderé como si fuera Manu, basándome en sus conocimientos técnicos que él mismo me ha definido." :
                  "Feel free to ask me any questions about Manu Barreto's resume or any technical questions related to his skills and experiences. I will respond to you as if I were Manu, based on the technical knowledge that he has defined for me."
                }
              </p>
            }
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="Human"
                placeholder={lang === 'SPA' ? "Su consulta no molesta 😊" : "Your inquiry is not a bother 😊"}
                value={animalInput}
                onChange={(e) => setAnimalInput(e.target.value)}
                disabled={isLoading}
              />
              {isLoading || animalInput === '' && <div className={styles.disclaimer}>{lang === 'SPA' ? "Tip: Se habilitará el boton ni bien escriba su consulta" : "Tip: The button will be enabled as soon as you write your query."}</div>}
              {isLoading ? <div className={styles.writing}>{lang === 'SPA' ? "Con Manu estamos pensando la respuesta..." : "We're thinking about the response with Manu..."}</div> :
                <input type="submit" value={lang === 'SPA' ? "Preguntas sobre Manu" : " Questions about Manu"} disabled={isLoading || animalInput === ''} />}
            </form>
            {result &&

              <div className={styles.result}>{result}</div>
            }
          </>
        }
      </main>
    </div>
  );
}

export async function getStaticProps(context) {

  return {
    props: { passEnv: process.env.PASSGENERIC },
  };
}