import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        music: "Music",
        live: "Live",
        about: "About",
      },
      music: {
        title: "Music",
      },
      live: {
        title: "Live",
        empty: "No gigs right now…",
        moreSoon: "More dates coming soon — follow us on socials.",
        bookUs: "Want to book us?",
        city: "City",
        address: "Address",
        time: "Time",
        eventLink: "Event link",
      },
      pastGigs: {
        title: "Past shows",
      },
      info: {
        title: "About",
        p1: "With strong melodies and swinging rhythms, Malmö trio Totes playfully yet confidently move between rock, funk, blues and jazz.",
        p2: "Totes consists of Svante Berg, Hannes Linnér and Gabriel Fager Ferrari. Since 2023, the Malmö-based band has been performing funky pop songs with one shared goal: to spread joy and to get people dancing. They venture through a wide variety of soundscapes, where tasteful guitar, a rumbling bass and drums at just the right tempo are topped off with a scoop of sexy saxophone.",
      },
      common: {
        orSocials: "— or DM us on socials!",
      },
      lang: {
        change: "Change language",
        english: "English",
        swedish: "Svenska",
        spanish: "Español",
      },
    },
  },

  sv: {
    translation: {
      nav: {
        music: "Musik",
        live: "Live",
        about: "Om",
      },
      music: {
        title: "Musik",
      },
      live: {
        title: "Live",
        empty: "Inga gigs för tillfället…",
        moreSoon: "Fler datum släpps löpande – följ oss i sociala kanaler.",
        bookUs: "Vill du boka oss?",
        city: "Stad",
        address: "Adress",
        time: "Tid",
        eventLink: "Länk till evenemang",
      },
      pastGigs: {
        title: "Tidigare spelningar",
      },
      info: {
        title: "Om",
        p1: "Med starka melodier och svängiga rytmer rör sig Malmö-trion Totes lekfullt men självsäkert mellan rock, funk, blues och jazz.",
        p2: "Bandet består av Svante Berg, Hannes Linnér och Gabriel Fager Ferrari, som sedan 2023 har spelat sina medryckande poplåtar med ett gemensamt mål: att sprida glädje och uppmuntra till dans. Med stilsäker gitarr, mullrande bas och trummor med precis rätt tempo, bjuder Totes även på vacker stämsång och en skopa sexig saxofon.",
      },
      common: {
        orSocials: "— eller skriv på någon socialmedia!",
      },
      lang: {
        change: "Byt språk",
        english: "English",
        swedish: "Svenska",
        spanish: "Español",
      },
    },
  },

  es: {
    translation: {
      nav: {
        music: "Música",
        live: "Conciertos",
        about: "Sobre nosotros",
      },
      music: {
        title: "Música",
      },
      live: {
        title: "Conciertos",
        empty: "No hay conciertos por ahora…",
        moreSoon: "Más fechas pronto — síguenos en redes.",
        bookUs: "¿Quieres contratarnos?",
        city: "Ciudad",
        address: "Dirección",
        time: "Hora",
        eventLink: "Enlace del evento",
      },
      pastGigs: {
        title: "Conciertos anteriores",
      },
      info: {
        title: "Sobre nosotros",
        p1: "Con melodías contundentes y ritmos swing, el trío malmiense Totes se mueve con soltura entre rock, funk, blues y jazz.",
        p2: "Totes son Svante Berg, Hannes Linnér y Gabriel Fager Ferrari. Desde 2023 la banda con base en Malmö toca pop funky con un objetivo: repartir alegría y hacer bailar. Recorren paisajes sonoros muy variados, con guitarra elegante, bajo profundo y batería al tempo justo, rematado con una pizca de saxofón.",
      },
      common: {
        orSocials: "— o escríbenos por redes.",
      },
      lang: {
        change: "Cambiar idioma",
        english: "English",
        swedish: "Svenska",
        spanish: "Español",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", //init
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
