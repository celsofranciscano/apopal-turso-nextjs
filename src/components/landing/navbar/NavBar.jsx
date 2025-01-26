"use client";
import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import ProfileCard from "@/components/dashboard/sidebar/ProfileCard";
import LinkButton from "@/components/common/buttons/LinkButton";
import { useSession } from "next-auth/react";


function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 64);
    const handleResize = ({ matches }) => matches && setIsSidebarOpen(false);
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize(mediaQuery);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const headerBgClass =
    isSidebarOpen || isScrolled ? "bg-white text-black" : "bg-transparent ";

  return (
    <>
      <header
        className={`${headerBgClass} z-20 h-16 fixed w-full flex items-center text-white justify-between px-4 md:px-16`}
      >
        <a className="flex gap-1 items-center" href="/">
          {/* <img className="w-12" src="/logo-idiomify.png" alt="logo idiomify" /> */}
          <span className="text-2xl font-bold text-current  ">APOPAL</span>
        </a>

        {/* <nav className="hidden md:flex">
          <ul className="flex gap-2">
            <NavLink name={"Inicio"} href={"/"} />
            <NavLink name={"Plomeria"} href={"#plomeria"} />
            <NavLink name={"Denuncias"} href={"#denuncias"} />
            <NavLink
              name={"Servicios"}
              href={"/servicios"}
              sublinks={[
                { name: "Desarrollo Web", href: "/servicios/web" },
                { name: "Diseño Gráfico", href: "/servicios/diseno-grafico" },
                {
                  name: "Marketing Digital",
                  href: "/servicios/marketing-digital",
                },
              ]}
            />
          </ul>
        </nav> */}

        <div className="flex items-center justify-center gap-4">
          <ProfileCard />
          {session?.user ? (
            <LinkButton name={"Volver a cuenta"} href={"/dashboard"} />
          ) : (
            <LinkButton name={"Iniciar sesión"} href={"/auth/login"} />
          )}

          {/* <button
            onClick={toggleSidebar}
            className="md:hidden bg-zinc-200 rounded-full p-0.5 text-zinc-700"
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
          </button> */}
        </div>
      </header>

      {/* <div
        onClick={toggleSidebar}
        className={` ${
          isSidebarOpen ? "block" : "hidden"
        }   md:hidden bg-zinc-400 h-screen top-16 fixed w-full dark:opacity-60 opacity-30`}
      ></div> */}

      <aside
        className={` ${
          isSidebarOpen ? "block" : "hidden"
        }   md:hidden bg-white  w-72 md:w-60  border-r dark:border-none h-screen   fixed top-16  px-4 py-8`}
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
              name={"Tienda"}
              href={"/tienda"}
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
                  d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                />
              </svg>
            </NavLink>

            <NavLink
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
            </NavLink>

            <NavLink
              name={"Nosotros"}
              href={"/nosotros"}
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
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </NavLink>

            <NavLink
              name={"Contacto"}
              href={"/contacto"}
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
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default NavBar;
