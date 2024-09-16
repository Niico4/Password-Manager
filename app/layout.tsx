import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import { Bounce, ToastContainer } from 'react-toastify';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const onest = Onest({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'SavePassword',
  description:
    'SavePassword es una aplicación moderna para gestionar contraseñas de manera segura. Construida con Next.js y TypeScript, ofrece una interfaz elegante con TailwindCSS y NextUI, y utiliza NextAuth para su autenticación.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${onest.className} antialiased`}>{children}</body>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
        transition={Bounce}
      />
    </html>
  );
}
