import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anas — Web Developer",
  description: "The portfolio of Anas. Web apps, scripts, and small tools built with PHP, React, Python and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
