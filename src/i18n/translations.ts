export type Language = 'en' | 'ga' | 'es';

export const languageNames: Record<Language, string> = {
  en: 'English',
  ga: 'Gaeilge',
  es: 'Español',
};

export const translations = {
  en: {
    // Header
    brandName: 'The Hiking Collective',
    nav: {
      events: 'Events',
      routes: 'Routes',
      community: 'Community',
      createEvent: 'Create event',
      searchPlaceholder: 'Search events...',
      myProfile: 'My Profile',
      editProfile: 'Edit Profile',
      myEvents: 'My Events',
      savedRoutes: 'Saved Routes',
      signOut: 'Sign out',
    },
    // Hero
    hero: {
      badge: 'Join the adventure',
      titleLine1: 'Adventures are better',
      titleLine2: 'with buddies',
      description: 'The Hiking Collective is a non-profit community of outdoor and sport lovers. Join an upcoming hiking, climbing, cycling - you name it - event or organise your own!',
      browseEvents: 'Browse Events',
      exploreRoutes: 'Explore Routes',
      imageAlt: 'Hikers on a mountain trail at sunrise',
    },
    // Mission
    mission: {
      title: 'What we stand for',
      description: 'We are a community of outdoor sports lovers and restless mountains explorers and we believe it is more fun to do it together. Most of events are organized by passionate community members, just like you, and therefore free of charge except transportation and personal costs.',
      learnMore: 'More about community rules and values',
      imageAlt: 'Hiker exploring a canyon',
    },
    // Events Section
    events: {
      title: 'Upcoming Events',
      viewAll: 'View all events',
    },
    // Footer
    footer: {
      imprint: 'Imprint',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
      copyright: '© 2026 The Hiking Collective',
    },
  },
  ga: {
    // Header
    brandName: 'An Comhchoiste Siúlóide',
    nav: {
      events: 'Imeachtaí',
      routes: 'Bealaí',
      community: 'Pobal',
      createEvent: 'Cruthaigh imeacht',
      searchPlaceholder: 'Cuardaigh imeachtaí...',
      myProfile: 'Mo Phróifíl',
      editProfile: 'Cuir Próifíl in Eagar',
      myEvents: 'Mo Imeachtaí',
      savedRoutes: 'Bealaí Sábháilte',
      signOut: 'Sínigh amach',
    },
    // Hero
    hero: {
      badge: 'Bí páirteach san eachtra',
      titleLine1: 'Is fearr eachtraí',
      titleLine2: 'le cairde',
      description: 'Is pobal neamhbhrabúis de lucht spóirt amuigh faoin aer agus taiscéalaithe sléibhe muid. Bí páirteach in imeacht siúlóide, dreapadóireachta, rothaíochta - nó eagraigh do cheann féin!',
      browseEvents: 'Brabhsáil Imeachtaí',
      exploreRoutes: 'Taiscéal Bealaí',
      imageAlt: 'Siúlóirí ar chosán sléibhe ag éirí na gréine',
    },
    // Mission
    mission: {
      title: 'Cad a sheasaimid ar a son',
      description: 'Is pobal de lucht spóirt amuigh faoin aer agus taiscéalaithe sléibhe muid agus creidimid go bhfuil sé níos spraíúla é a dhéanamh le chéile. Is baill díograiseacha den phobal a eagraíonn an chuid is mó de na himeachtaí, díreach cosúil leatsa, agus dá bhrí sin saor in aisce ach amháin iompar agus costais phearsanta.',
      learnMore: 'Tuilleadh faoi rialacha agus luachanna an phobail',
      imageAlt: 'Siúlóir ag taiscéaladh gleann',
    },
    // Events Section
    events: {
      title: 'Imeachtaí atá le Teacht',
      viewAll: 'Féach ar gach imeacht',
    },
    // Footer
    footer: {
      imprint: 'Imprionta',
      about: 'Fúinn',
      privacy: 'Príobháideachas',
      terms: 'Téarmaí',
      contact: 'Teagmháil',
      copyright: '© 2026 An Comhchoiste Siúlóide',
    },
  },
  es: {
    // Header
    brandName: 'El Colectivo de Senderismo',
    nav: {
      events: 'Eventos',
      routes: 'Rutas',
      community: 'Comunidad',
      createEvent: 'Crear evento',
      searchPlaceholder: 'Buscar eventos...',
      myProfile: 'Mi Perfil',
      editProfile: 'Editar Perfil',
      myEvents: 'Mis Eventos',
      savedRoutes: 'Rutas Guardadas',
      signOut: 'Cerrar sesión',
    },
    // Hero
    hero: {
      badge: 'Únete a la aventura',
      titleLine1: 'Las aventuras son mejores',
      titleLine2: 'con amigos',
      description: 'El Colectivo de Senderismo es una comunidad sin ánimo de lucro de amantes del deporte al aire libre. ¡Únete a un evento de senderismo, escalada, ciclismo u organiza el tuyo propio!',
      browseEvents: 'Ver Eventos',
      exploreRoutes: 'Explorar Rutas',
      imageAlt: 'Senderistas en un sendero de montaña al amanecer',
    },
    // Mission
    mission: {
      title: 'Lo que defendemos',
      description: 'Somos una comunidad de amantes del deporte al aire libre y exploradores incansables de montañas, y creemos que es más divertido hacerlo juntos. La mayoría de los eventos son organizados por miembros apasionados de la comunidad, como tú, y por lo tanto son gratuitos excepto transporte y gastos personales.',
      learnMore: 'Más sobre las reglas y valores de la comunidad',
      imageAlt: 'Senderista explorando un cañón',
    },
    // Events Section
    events: {
      title: 'Próximos Eventos',
      viewAll: 'Ver todos los eventos',
    },
    // Footer
    footer: {
      imprint: 'Aviso legal',
      about: 'Acerca de',
      privacy: 'Privacidad',
      terms: 'Términos',
      contact: 'Contacto',
      copyright: '© 2026 El Colectivo de Senderismo',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
