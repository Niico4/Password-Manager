import {
  IconBrandCashapp,
  IconDeviceDesktopAnalytics,
  IconDeviceGamepad,
  IconHeart,
  IconHome,
  IconPasswordUser,
  IconUsers,
} from '@tabler/icons-react';

export const dataSidebarRoutes = [
  {
    title: 'Mis Contraseñas',
    href: '/',
    icon: IconHome,
  },
  {
    title: 'Categorías',
    children: [
      {
        title: 'Favoritas',
        href: '/categories/favorites',
        icon: IconHeart,
      },
      {
        title: 'Social',
        href: '/categories/social',
        icon: IconUsers,
      },
      {
        title: 'VideoJuegos',
        href: '/categories/videogames',
        icon: IconDeviceGamepad,
      },
      {
        title: 'Suscripciones',
        href: '/categories/subscriptions',
        icon: IconBrandCashapp,
      },
    ],
  },
  {
    title: 'Generador',
    href: '/generator',
    icon: IconPasswordUser,
  },
  {
    title: 'Estadísticas',
    href: '/analytics',
    icon: IconDeviceDesktopAnalytics,
  },
];
