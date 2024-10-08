import SidebarMobile from '@/app/components/layout/Sidebar/Mobile/SidebarMobile';
import Sidebar from '@/app/components/layout/Sidebar/Sidebar';

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

      <section className="hidden lg:flex h-full max-w-lg w-60">
        <Sidebar />
      </section>

      <section className="w-full">
        <div className="p-6">{children}</div>
      </section>
    </main>
  );
}
