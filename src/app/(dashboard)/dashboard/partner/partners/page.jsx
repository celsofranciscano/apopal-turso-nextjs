import TableOficial from "@/components/common/tables/TableOficial";
function PartnersPage() {
  const columns = [
    "ID",
    "Codigo",
    "CI",
    "Nombre",
    "Apellido",
    "Telefono",
    "Registro",
    "Estado",
  ];

  return (
    <section className="grid gap-4">
      <TableOficial
        url={"dashboard/partners"}
        columns={columns}
        name={"Socio"}
        title={"Socios"}
      />
    </section>
  );
}

export default PartnersPage;
