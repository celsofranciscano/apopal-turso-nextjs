import Tablesoficila from "@/components/common/tables/TableOficial";
function AdministratorsPage() {
  const columns = [
    "ID",
    "Nombre",
    "Apellido",
    "Privilegio",
    "Ingreso",
    "Creado",
    "Estado",
  ];

  return (
    <section className="grid gap-4">
      <Tablesoficila
        url={"settings/users"}
        columns={columns}
        name={"Usuario"}
        title={"Administradores"}
      />
    </section>
  );
}

export default AdministratorsPage;
