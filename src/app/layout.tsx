import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceMonoFont = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "SunHex - SIN Generator/Decoder API",
  description: "Secure Social Insurance Number Generator & Decoder API with advanced encryption and validation",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${spaceMonoFont.variable} antialiased font-mono`}>
        {children}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
