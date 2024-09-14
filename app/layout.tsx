import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';

const onest = Onest({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Clave Segura',
  description:
    'Clave Segura es una aplicación moderna para gestionar contraseñas de manera segura. Construida con Next.js y TypeScript, ofrece una interfaz elegante con TailwindCSS y NextUI, y utiliza NextAuth para su autenticación.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${onest.className} antialiased`}>{children}</body>
    </html>
  );
}
