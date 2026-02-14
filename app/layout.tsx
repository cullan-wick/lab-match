import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research Match — UW-Madison",
  description: "Connecting students with research opportunities at UW-Madison",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
