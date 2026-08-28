import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tag-it | Watermark Your Content",
  description: "Tag your images and videos. Own your brand. Built by Jozi Nites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
