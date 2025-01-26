import NavLinkDashboard from "@/components/dashboard/sidebar/NavLinkDashboard";

function Layout({ children }) {
  const links = [
      { name: "Asistencias", path: "/dashboard/asistencias" },
      { name: "Actividades", path: "/dashboard/asistencias/actividad" },
      { name: "Tipos de actividades", path: "/dashboard/asistencias/tipoactividad" },
  ];
  return (
    <section className="grid gap-4 ">
      <header className="">
        <NavLinkDashboard links={links} />
      </header>
      {children}
      <footer className="py-4"></footer>
    </section>
  );
}

export default Layout;
