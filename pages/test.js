import React, { useState } from 'react';
import openai from 'openai';

function App() {
  const [archivo, setArchivo] = useState(null);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleArchivoCambio = (evento) => {
    setArchivo(evento.target.files[0]);
  };

  const handlePreguntaCambio = (evento) => {
    setPregunta(evento.target.value);
  };

  const enviarPregunta = async () => {
    const apikey = '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';

    // Leer el contenido del archivo en texto plano
    const contenido = await archivo.text();

    // Enviar la pregunta a la API de OpenAI
    const respuesta = await openai.completions.create({
      engine: 'text-davinci-003',
      prompt: pregunta,
      maxTokens: 1024,
      temperature: 0.5,
      n: 1,
      stop: null,
      input: contenido,
      apiKey: apikey
    });

    // Actualizar la respuesta en la caja de texto
    setRespuesta(respuesta.choices[0].text);
  };

  return (
    <div>
      <h1>Preguntar a ChatGPT-3</h1>
      <label>
        Seleccionar archivo:
        <input type="file" onChange={handleArchivoCambio} />
      </label>
      <br />
      <label>
        Pregunta:
        <input type="text" value={pregunta} onChange={handlePreguntaCambio} />
      </label>
      <br />
      <button onClick={enviarPregunta}>Enviar pregunta</button>
      <br />
      <label>
        Respuesta:
        <textarea value={respuesta} readOnly />
      </label>
    </div>
  );
}

export default App;