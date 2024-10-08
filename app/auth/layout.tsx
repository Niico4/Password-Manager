export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
