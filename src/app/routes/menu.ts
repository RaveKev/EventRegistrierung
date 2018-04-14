
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const headingMain = {
    text: 'Main Navigation',
    heading: true
};

const seminars = {
  text: 'Aktivitäten',
  link: '/seminars',
  icon: 'icon-calendar',
  submenu: [
    {
      text: 'Übersicht',
      link: '/seminars/overview'
    },
   /* {
      text: 'Kalender',
      link: '/seminars/calendar'
    },*/
    {
      text: 'Neu',
      link: '/seminars/create'
    },
  ]
}

const administration = {
  text: 'Administration',
  link: '/administration',
  icon: 'fa fa-cogs',
  submenu: [
    {
      text: 'Kategorien',
      link: '/administration/categories'
    }
  ]
}


const headingUser = {
  text: 'Benutzer',
  heading: true
};

const user = {
  text: 'Benutzer',
  link: '/user',
  icon: 'fa fa-user',
  submenu: [
    {
      text: 'Einstellungen',
      link: '/user/settings'
    },
    {
      text: 'Buchungen',
      link: '/booking/overview'
    }
  ]
}

export const menu = [
    headingMain,
    Home,
    seminars,
    administration,
    headingUser,
    user
];
