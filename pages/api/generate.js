import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const human = req.body.human || '';
  if (human.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid human",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(human),
      temperature: 0.3,
      max_tokens: 450,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(human) {
  const capitalizedHuman =
    human[0].toUpperCase() + human.slice(1).toLowerCase();
  return `
  Human: Qué es FEBICHAM? 
  AI: En ingles sus siglas corresponden a “FEDERATION BINATIONAL CHAMBERS OF COMMERCE”. La Federación de Cámaras de Comercio Binacionales – FEBICHAM, es una organización multinacional sin fines de lucro y sus miembros son Cámaras de Comercio Binacionales, inicialmente basadas en la Ciudad de Miami.
  FEBICHAM que dio sus primeros pasos en el año 2018 gracias a la iniciativa de los Presidentes de las Cámaras Binacionales de Argentina, Chile, Perú, Venezuela y Uruguay.
  El rol principal de dicha Federación, es ser facilitador de contactos y usar su poder de convocatoria para ayudar a cada una de sus Cámaras a difundir sus actividades, eventos, y en los casos que fuese necesario, lograr un mejor acceso a ciertas oficinas del gobierno local o nacional.
  FEBICHAM ha iniciado sus actividades organizando eventos de networking con sus Cámaras asociadas, quienes convocan a sus miembros y amigos, y se logra una muy buena concurrencia, interesada en establecer contactos y lazos que potencien sus negocios.
  Una de las motivaciones de los fundadores fue: “Juntos somos más”
  “Somos la voz de las Cámaras Binacionales de Comercio en Estados Unidos y el punto de encuentro para aprovechar el intercambio de experiencias y oportunidades de negocios.”
  Human: Quienes integran actualmente la Junta Directiva de FEBICHAM?
  AI: Las autoridades de la Junta Directiva de FEBICHAM son:
  El actual Presidente, es el Sr. Patricio Sepúlveda, representante de la Cámara de Chile.
  En cuanto a vicepresidentes FEBICHAM tiene varios y estos son:
  El 1er Vicepresidente FEBICHAM, es Roberto Macho, Presidente de la Cámara de Argentina.
  El Vicepresidente FEBICHAM, es Silvio Righetti, Presidente de la Cámara de Uruguay.
  El Vicepresidente FEBICHAM, es Enrique Chauca, Presidente de la Cámara de Perú.
  La Vicepresidente FEBICHAM, es Sandra Clavijo, Vicepresidente de la Cámara de Colombia.
  La Tesorera de FEBICHAM, María Angelica Berrizbeitia, Tesorera de la Cámara de Venezuela.
  Human: Cuales son los datos de contacto de FEBICHAM?
  AI: La página web es https://febicham.org/ , la dirección es 420 SW 7th Street Suite 1109, Edificio Megacenter Brickell, Miami, Florida, Zip Code 33130, United States y su email es info@febicham.org.
  Human: Cuando se creó FEBICHAM?
  AI: En el año 2018
  Human: Cual es la Visión de FEBICHAM?
  AI: Ser reconocida como un ente experto e influyente que busca facilitar la concreción de Oportunidades de Negocios en un contexto más allá del alcance meramente binacional de cada Cámara, proporcionando valor agregado a las Cámaras Binacionales que representa y a sus comunidades.
  Ser el punto de encuentro para todas las Cámaras Binacionales en los EEUU, para potenciar sus fortalezas y encontrar nuevas oportunidades para todos sus miembros.
  Human: Cual es la Misión de FEBICHAM?
  AI: Proveer a las Cámaras Binacionales y sus miembros oportunidades de negocio multinacionales concretos y continuos en un marco más amplio que el de su propia naturaleza binacional.
  Representar los intereses comunes de las Cámaras Binacionales y sus miembros
  Impulsar y desarrollar los lazos comerciales y culturales entre las Cámaras Binacionales estableciendo un vínculo que potencie las relaciones empresariales de sus miembros dentro de un ámbito de fraternidad e integración internacional.
  Human: Cuales son los objetivos de FEBICHAM?
  AI: Es importante tener en cuenta que el alcance de FEBICHAM es Federal, no solo del área de Miami.  Nació en esta ciudad pero se espera contar con Cámaras Binacionales de todo los EEUU. Unir y canalizar los actuales esfuerzos de las Cámaras Binacionales, en una dimensión internacional mucho más amplia, vía la identificación y generación de oportunidades de negocios multinacionales.
  Generar vínculos concretos de negocios, aprovechando las redes de contactos de todas las Cámaras federadas, ser un punto de unión de todas ellas, con el propósito de fomentar el trabajo común.
  Aumentar la representatividad y presencia de las Cámaras Binacionales ante las agencias gubernamentales de los países miembros, los bancos multinacionales y promover las relaciones de las mismas, con otras Federaciones afines.
  FEBICHAM espera ser un facilitador en la relación comercial entre las Cámaras Binacionales de los Estados Unidos, y generar vínculos concretos de negocios, a través de la creciente red de contactos de sus directivos e instituciones, que proporciona acceso a información relevante y actualizada.
  Human: Como es la administración de FEBICHAM?
  AI: El Directorio de la Federación, está conformado por 11 Directores y un Presidente, cada uno de ellos representando a las Cámaras Binacionales miembros de este organismo: Argentina, Chile, Perú, Venezuela, Uruguay, Honduras, Colombia, Camacol, Costa Rica, Ecuador, Asia Pacífica y Paraguay.
  Human: Quien es el actual presidente de FEBICHAM?
  AI: El actual Presidente, es el Sr. Patricio Sepúlveda, representante de la Cámara de Chile.
  Human: Cual es el poder diferenciador de FEBICHAM?
  AI: El Poder Diferenciador de FEBICHAM es, en grandes rasgos, el poder que se ha podido lograr resaltar con esta iniciativa:
  1. Tener la capacidad de llegar a tantos potenciales clientes a través de sus Cámaras afiliadas.
  2. Conceptos que constituyen una piedra angular de nuestro quehacer son: “el valor agregado que constituye la Federación para las Cámaras que la constituyen” –  “juntos somos más”  –  “el valor de interrelacionar”  –  “estamos construyendo con la Federación una plataforma única y muy potente  con poder de convocatoria , influyente y alcance multisectorial …”  
  3. La influencia combinada de la Federación y sus Cámaras afiliadas, más los contactos que se logran a todo nivel, es muy potente.  
  4. Sus concurridos eventos, presentaciones de destacados y reconocidos profesionales, ayudas para organizar misiones comerciales de sus miembros y creación de Rondas de Negocios para los mismos.
  5. Los eventos de capacitación de diferentes organizaciones cuyos temas sean relacionados con negocios y gerencia, presentados de una manera anticipada y accesible en el web page de FEBICHAM.
  6. La agenda de eventos semanales (Webinars) organizados por las distintas Cámaras ayudan sin duda a su difusión y lo mismo ocurre con los documentos que se preparen para cualquier tema que pueda ser de utilidad para todos los miembros de cada una de las Cámaras.
  Human: ${capitalizedHuman}
  AI:
`;
}
