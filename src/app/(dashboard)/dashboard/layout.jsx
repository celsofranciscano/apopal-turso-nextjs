import localFont from "next/font/local";
import "../../globals.css";
import DashboardSideBar from "@/components/dashboard/sidebar/SideBar";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/context/appContext";
import DangerAlert from "@/components/common/alerts/DangerAlert";
import SuccessAlert from "@/components/common/alerts/SuccessAlert";

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
    <AppProvider>
      <SessionProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-200 text-zinc-700`}
          >
            <DashboardSideBar />
            <main className="pt-20 md:pl-64 px-4">{children}</main>
            <div className=" flex items-center justify-between  fixed w-full px-4 md:px-16 left-0 bottom-8  z-50 ">
              <div></div>
              <div className="flex flex-col gap-4 w-full md:w-96">
                <DangerAlert />
                <SuccessAlert />
              </div>
            </div>
          </body>
        </html>
      </SessionProvider>
    </AppProvider>
  );
}
