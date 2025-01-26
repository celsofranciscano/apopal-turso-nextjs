import localFont from "next/font/local";
import "../globals.css";
import SideBar from "@/components/landing/navbar/NavBar";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "APOPAL",
  description: "Agua Potable el Palmar",
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-200 text-zinc-700 `}
        >
          <SideBar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
