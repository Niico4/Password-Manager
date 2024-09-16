import {
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
        href: '/favorites',
        icon: IconHeart,
      },
      {
        title: 'Social',
        href: '/social',
        icon: IconUsers,
      },
      {
        title: 'VideoJuegos',
        href: '/games',
        icon: IconDeviceGamepad,
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
