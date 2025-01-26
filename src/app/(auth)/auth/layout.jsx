import { AppProvider } from "@/context/appContext";
import localFont from "next/font/local";
import "../../globals.css";
import BackButton from "@/components/common/buttons/BackButton";
import Link from "next/link";
import DangerAlert from "@/components/common/alerts/DangerAlert";
import SuccessAlert from "@/components/common/alerts/SuccessAlert";
import Footer from "@/components/common/footer/Footer";
import { SessionProvider } from "next-auth/react";
const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
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
      <AppProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased  p-4 md:pt-10 md:px-16`}
          >
            <div className="flex items-center justify-between  ">
              <BackButton />

              <Link href="/" className="flex items-center gap-2">
                {/* <img
                className="w-8"
                src="https://english-murex-xi.vercel.app/logo-idiomify.png"
                alt=""
                /> */}
                <h1 className="text-lg">APOPAL</h1>
              </Link>
            </div>
            <main className="">{children}</main>

            <div className=" flex items-center justify-between  fixed w-full px-4 md:px-16 left-0 bottom-8  z-50 ">
              <div></div>
              <div className="flex flex-col gap-4 w-full md:w-96">
                <DangerAlert />
                <SuccessAlert />
              </div>
            </div>
          </body>
        </html>
      </AppProvider>
    </SessionProvider>
  );
}
