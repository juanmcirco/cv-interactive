import Head from "next/head";
import { useState } from "react";

import styles from "./index.module.css";
import { event } from "nextjs-google-analytics";
import Image from "next/image";

export default function Home({ passEnv }) {
  const [messageInput, setMessageInput] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState();
  const [lang, setLang] = useState('SPA');
  const [firstIteration, setFirstIteration] = useState(null)
  const [passwordInputLength, setPasswordInputLength] = useState(0);
  async function onSubmit(e) {
    setIsLoading(true)
    e.preventDefault();
    try {
      setResult('');
      const response = await fetch(lang === 'SPA' ? '/api/generate' : '/api/generate-eng', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ human: messageInput }),
      });

      event("mensaje de usuario", {
        category: "chat",
        label: messageInput,
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      event("resultado del bot", {
        category: "chat",
        label: data.result,
      });
      setLastMessage(messageInput)
      setResult(data.result);
      setFirstIteration(true)
      setMessageInput("");
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
    setResult(null)
    setLang(langValue)
  }

  return (
    <div style={{display:'flex'}}>
      <Head>
        <title>FEBICHAM</title>
        <script async type='text/javascript' src="/js/newrelic.js"></script>
        <script async type='text/javascript' src="/js/gtm.js"></script>
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>

      <main className={styles.main}>
        <div className={styles.manu}>
          <img src='/chatbot-banderas.png' width={200}  />
        </div>
        <h3 style={{textAlign:'center'}}>
          {lang === 'SPA' ?
            'Asistente FEBICHAM'
            :
            'Job assistance'
          }
        </h3>
        {/* <div className={styles.btnsLang}>
          <span onClick={() => handleLang('ENG')} className={lang === 'ENG' ? styles.btnSelected : ''}>English</span> | <span onClick={() => handleLang('SPA')} className={lang === 'SPA' ? styles.btnSelected : ''}>Español</span>
        </div> */}
        {!pass &&
          <>
            {(passwordInputLength > 5 && passwordInputLength <= 15) && <div className={styles.disclaimerPass}> {lang === 'SPA' ? 'Mmm me parece que no tenes la password' : "Mmm, it seems to me that you don't have the password."}</div>}
            {passwordInputLength >= 15 && <div className={styles.disclaimerPass}>{lang === 'SPA' ? 'Mmm Dejaría de probar, no vas a llegar a nada...' : "Mmm, I would stop trying, you won't get anywhere..."}</div>}
            <input type="password" placeholder="******" onChange={handlePass} />
          </>
        }
        {pass &&
          <>
            {!firstIteration &&
              <p style={{textAlign:'center'}}>
                {lang === 'SPA' ?
                  "Bienvenido a FEBICHAM, Federación de Cámaras de Comercio Binacionales. Estamos aquí para ayudarle a conectar con oportunidades de negocios multinacionales y desarrollar relaciones comerciales y culturales entre nuestras Cámaras, Oficinas consulares y Oficinas comerciales. ¡Estamos encantados de tenerte aquí!" :
                  "Feel free to ask me questions about the applicants. I will be your assistant and I will answer based on their technical knowledge that they themselves have defined for me."
                }
              </p>
            }
            {result &&
              <div className={styles.result}>
                <div className={styles.lastQuestion}>
                  {lastMessage}
                </div>
                  {result}
              </div>
            }
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="Human"
                placeholder={lang === 'SPA' ? "Realice su consulta" : "Your inquiry is not a bother 😊"}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                disabled={isLoading}
              />
              {isLoading || messageInput === '' && <div className={styles.disclaimer}>{lang === 'SPA' ? "Tip: Se habilitará el boton ni bien escriba su consulta" : "Tip: The button will be enabled as soon as you write your query."}</div>}
              {isLoading ? <div className={styles.writing}>{lang === 'SPA' ? "Estamos pensando la respuesta..." : "We're thinking about the response with Manu..."}</div> :
                <input type="submit" value={lang === 'SPA' ? "Consultar sobre FEBICHAM" : " Questions about Manu y Ale"} disabled={isLoading || messageInput === ''} />}
            </form>
            
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