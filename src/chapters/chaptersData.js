/**
 * chaptersData.js - Libro Mari
 * Estructura de capítulos, páginas, animaciones y contenidos para Mari · 4 de Agosto.
 */

const baseUrl = import.meta.env.BASE_URL || './';
export const asset = (path) => `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

export const bookMetadata = {
  title: "Para Mari",
  subtitle: "4 de Agosto",
  dedication: "Nuestra fórmula incondicional",
  theme: "cosmic_alchemy",
  songDetails: {
    title: "Melodía para Mari",
    artist: "Especial Amistad",
    audioSrc: asset("audio/page_flip_soft.m4a")
  }
};

export const chapters = [
  {
    id: "capitulo-1",
    numberRoman: "Capítulo I",
    number: 1,
    title: "4 de Agosto · Cumpleaños",
    date: "4 de Agosto",
    targetPage: 2,
    description: "Carta de cumpleaños animada con nuestra fórmula de amor incondicional",
    isUpcoming: false
  },
  {
    id: "capitulo-2",
    numberRoman: "Capítulo II",
    number: 2,
    title: "Navidad",
    date: "Diciembre",
    targetPage: 6,
    description: "Capítulo especial de Navidad entre luces y nieve mágica",
    isUpcoming: false
  },
  {
    id: "capitulo-3",
    numberRoman: "Capítulo III",
    number: 3,
    title: "Fin de Año",
    date: "31 de Diciembre",
    targetPage: 8,
    description: "Brindis por nuevos comienzos, metas cumplidas y más historias juntos",
    isUpcoming: false
  },
  {
    id: "capitulo-4",
    numberRoman: "Capítulo IV",
    number: 4,
    title: "Próximamente",
    date: "El futuro",
    targetPage: 10,
    description: "Espacio reservado para nuevas memorias y aventuras",
    isUpcoming: true
  }
];

export const bookPages = [
  // -------------------------------------------------------------
  // PÁGINA 1: ÍNDICE DE CAPÍTULOS
  // -------------------------------------------------------------
  {
    pageNumber: 1,
    type: "table_of_contents",
    title: "Índice de Capítulos"
  },

  // -------------------------------------------------------------
  // PÁGINA 2: PORTADILLA CAPÍTULO I (CUMPLEAÑOS)
  // -------------------------------------------------------------
  {
    pageNumber: 2,
    type: "chapter_header",
    roman: "Capítulo I",
    title: "4 de Agosto",
    subtitle: "Carta de Cumpleaños",
    quote: "«El amor incondicional es la fórmula que desafía todas las leyes del universo.»",
    badge: "Fórmula Científica & Amistad Incondicional"
  },

  // -------------------------------------------------------------
  // PÁGINA 3: CARTA RECREADA DESDE CERO (PARTE 1 - ANIMADA)
  // -------------------------------------------------------------
  {
    pageNumber: 3,
    type: "illuminated_letter_mari",
    part: 1,
    greeting: "¡Hola, Mari linda! Feliz cumpleaños.",
    leadParagraph: "Te mando un abrazote enorme y un beso gigante. No te imaginas la falta que me haces, te extraño cada día.",
    paragraphs: [
      "A pesar de la distancia, tú siempre has estado ahí para mí, apoyándome incondicionalmente en cada paso de mi vida y en cada momento difícil. Siempre encuentras la manera de hacerme reír y de sacarle un brillo especial a mi vida; te quiero muchísimo por eso, porque sin ti de verdad mi vida sería muy triste. También tengo que darte las gracias porque siempre me aguantas con mis bobadas y lo fastidioso que soy."
    ],
    interactiveMolecules: true
  },

  // -------------------------------------------------------------
  // PÁGINA 4: CARTA RECREADA DESDE CERO (PARTE 2 - ANIMADA)
  // -------------------------------------------------------------
  {
    pageNumber: 4,
    type: "illuminated_letter_mari",
    part: 2,
    paragraphs: [
      "En verdad eres una mujer maravillosa e increíble a la cual admiro demasiado. Siempre has sido mi inspiración y me motivas a seguir avanzando y mejorar cada día. Verte triunfar en la vida y crecer me hace inmensamente feliz; ver cómo te has convertido en una mujer increíblemente exitosa y brillante que inspira a todos a su alrededor.",
      "Te quiero muchísimo, nunca cambies. De verdad espero que cada día sigas siendo mejor para ti, que sigas cumpliendo todas tus metas y lo seas muy feliz siempre, porque cuando sonríes te ves aún más hermosa. Te quiero mucho, mucho y espero verte pronto nuevamente para celebrar."
    ],
    formulaBadge: "AMOR INCONDICIONAL ES NUESTRA FÓRMULA",
    closingBanner: "CON AMOR Y ADMIRACIÓN",
    originalArt: asset("images/carta_mari.jpg")
  },

  // -------------------------------------------------------------
  // PÁGINA 5: ILUSTRACIÓN MASTER EN ALTA RESOLUCIÓN
  // -------------------------------------------------------------
  {
    pageNumber: 5,
    type: "master_art_showcase",
    title: "Manuscrito Iluminado Original",
    subtitle: "Toca la ilustración para explorarla en ultra alta resolución",
    image: asset("images/carta_mari.jpg"),
    caption: "Manuscrito Iluminado: Mari Curie, Rosalind Franklin y Nuestra Fórmula Incondicional"
  },

  // -------------------------------------------------------------
  // PÁGINA 6: PORTADILLA CAPÍTULO II (NAVIDAD)
  // -------------------------------------------------------------
  {
    pageNumber: 6,
    type: "chapter_header",
    roman: "Capítulo II",
    title: "Navidad",
    subtitle: "Noches de Luz y Deseos",
    quote: "«Que la calidez de estas fiestas ilumine cada uno de tus sueños.»",
    badge: "Edición Especial Navideña"
  },

  // -------------------------------------------------------------
  // PÁGINA 7: INTERFAZ CAPÍTULO NAVIDAD (DISEÑO FESTIVO)
  // -------------------------------------------------------------
  {
    pageNumber: 7,
    type: "holiday_chapter",
    holidayType: "christmas",
    title: "Nuestra Primera Navidad en este Libro",
    greeting: "Querida Mari,",
    placeholderText: "Aquí irá tu mensaje especial de Navidad. La interfaz ya está diseñada con nieve cristalina, destellos cálidos, lazos dorados y muérdago botánico para cuando desees plasmar tus palabras para estas fiestas.",
    bannerText: "Paz, Luz y Alegría para Ti"
  },

  // -------------------------------------------------------------
  // PÁGINA 8: PORTADILLA CAPÍTULO III (FIN DE AÑO)
  // -------------------------------------------------------------
  {
    pageNumber: 8,
    type: "chapter_header",
    roman: "Capítulo III",
    title: "Fin de Año",
    subtitle: "Brindis por Nuevos Horizontes",
    quote: "«365 nuevas oportunidades para seguir brillando y conquistando el mundo.»",
    badge: "Bienvenida al Año Nuevo"
  },

  // -------------------------------------------------------------
  // PÁGINA 9: INTERFAZ CAPÍTULO FIN DE AÑO (NOCHEVIEJA)
  // -------------------------------------------------------------
  {
    pageNumber: 9,
    type: "holiday_chapter",
    holidayType: "new_year",
    title: "Un Brindis por Ti y por Nuestro Futuro",
    greeting: "Por un Año Extraordinario,",
    placeholderText: "Aquí irá tu mensaje de despedida y bienvenida de año. La interfaz está ambientada con relojes de época a las 11:59, copas de cristal resplandecientes y estrellas doradas de buenos augurios.",
    bannerText: "Nuevas Metas · Éxitos Infinitos · Siempre Juntos"
  },

  // -------------------------------------------------------------
  // PÁGINA 10: CAPÍTULO IV (PRÓXIMAMENTE)
  // -------------------------------------------------------------
  {
    pageNumber: 10,
    type: "epilogue_upcoming",
    title: "Capítulo IV",
    subtitle: "Historias por Escribir",
    note: "Este tomo continuará creciendo con cada nuevo viaje, celebración y momento inolvidable compartido."
  }
];
