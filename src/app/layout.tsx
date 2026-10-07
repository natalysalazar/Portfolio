"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <title>Nataly Salazar</title>
        {children}
      </body>
    </html>
  );
}
