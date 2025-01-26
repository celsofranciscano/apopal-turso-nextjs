import NavLinkDashboard from "@/components/dashboard/sidebar/NavLinkDashboard";

function Layout({ children }) {
  const links = [
    { name: "Busqueda", path: "/dashboard/partner" },
    { name: "Lista de socios", path: "/dashboard/partner/partners" },
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
