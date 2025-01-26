"use client";
import { useState } from "react";
import NavLink from "@/components/landing/navbar/NavLink";
import { useSession } from "next-auth/react";
import ProfileCard from "./ProfileCard";

function DashboardSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session } = useSession();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <header
        className={`bg-white shadow-md z-20 h-16 fixed w-full flex items-center justify-between px-4  text-white`}
      >
        <a className="flex gap-1 items-center" href="/">
          {/* <img className="w-12" src="/logo-idiomify.png" alt="logo idiomify" /> */}
          <span className="text-2xl font-bold  text-black ">APOPAL</span>
        </a>

        <div className="flex items-center justify-center gap-4">
          <ProfileCard />

          <button
            onClick={toggleSidebar}
            className="md:hidden bg-zinc-200 text-zinc-700 rounded-full p-0.5"
          >
            <svg
              className="w-6 h-6 text-current"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </header>

      <div
        onClick={toggleSidebar}
        className={` ${
          isSidebarOpen ? "block" : "hidden"
        }   md:hidden bg-zinc-400 h-screen top-16 fixed w-full dark:opacity-60 opacity-30`}
      ></div>

      <aside
        style={{ scrollbarWidth: "none" }}
        className={` ${
          isSidebarOpen ? "block" : "hidden"
        }   md:block bg-white shadow-md overflow-auto  w-72 md:w-60  border-r dark:border-none h-screen    fixed top-16  px-4 py-8`}
      >
        <nav className="">
          <ul className="grid  pt-8 ">
            <NavLink
              name={"Inicio"}
              href={"/"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              <svg
                className="w-5 h-5 text-current"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                />
              </svg>
            </NavLink>

            <NavLink
              name={"Socios"}
              href={"/dashboard/partner"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              <svg
                class="w-5 h-5 text-current "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>
            </NavLink>

            {/* <NavLink
              name={"Servicios"}
              href={"/servicios"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              sublinks={[
                { name: "Desarrollo Web", href: "/servicios/web" },
                { name: "Diseño Gráfico", href: "/servicios/diseno-grafico" },
                {
                  name: "Marketing Digital",
                  href: "/servicios/marketing-digital",
                },
              ]}
            >
              <svg
                className="w-5 h-5 text-current"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
            </NavLink> */}

            <NavLink
              name={"Lecturacion"}
              href={"/dashboard/lecturacion"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              <svg
                className="w-5 h-5 text-current"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                />
              </svg>
            </NavLink>

            <NavLink
              name={"Asistencias"}
              href={"/dashboard/asistencias"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              <svg
                className="w-5 h-5 text-current"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </NavLink>
            <NavLink
              name={"Pagos de consumo"}
              href={"/dashboard/consumo"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              <svg
                className="w-5 h-5 text-current"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
            </NavLink>
            <NavLink
              name={"Balance"}
              href={"/dashboard/balance"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              <svg
                className="w-5 h-5 text-current"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
                />
              </svg>
            </NavLink>
            <NavLink
              name={"Recortes"}
              href={"/dashboard/recortes"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              <svg
                className="w-5 h-5 text-current"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z"
                />
              </svg>
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSideBar;
