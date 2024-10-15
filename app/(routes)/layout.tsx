import Sidebar from '../components/layout/sidebar/Sidebar';
import SidebarMobile from '../components/layout/sidebar/SidebarMobile';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen lg:grid grid-cols-[240px_1fr] gap-2">
      <article className="flex justify-between items-center lg:hidden px-6 py-3">
        <SidebarMobile />
      </article>

      <section className="hidden lg:flex h-full max-w-lg w-60 shadow-lg shadow-black/20">
        <Sidebar />
      </section>

      <section className="w-full">
        <div className="p-6">{children}</div>
      </section>
    </main>
  );
}
