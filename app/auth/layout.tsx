import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (session) {
    redirect('/');
  }

  return (
    <div
      className="h-screen bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage: 'url("/bg.webp")',
      }}
    >
      <div className="w-[500px]">{children}</div>
    </div>
  );
}
