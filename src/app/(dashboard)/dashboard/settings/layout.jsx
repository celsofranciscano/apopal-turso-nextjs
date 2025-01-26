import NavLink from "@/components/landing/navbar/NavLink";

function Layout({ children }) {
  return (
    <main className="grid gap-4">
      <nav className="h-16 bg-white p-4 shadow-md rounded-md">
        <ul className="flex items-center  ">
          <NavLink name={"Ajustes"} href={"/dashboard/settings"} />
          <NavLink name={"Administradores"} href={"/dashboard/settings/users"} />
          <NavLink name={"Privilegios"} href={"/dashboard/settings/privileges"} />
        </ul>
      </nav>
      <section className="">

      {children}
      </section>

    </main>
  );
}

export default Layout;
