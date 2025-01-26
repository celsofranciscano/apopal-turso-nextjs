import Tablesoficila from "@/components/common/tables/TableOficial";
function ActividadesPage() {
  const columns = [
    "ID",
    "Actividad",
    "Fecha",
    "Inicio",
    "Fin",
    "Tipo",
  ];


  return (
    <section className="grid gap-4">
      <Tablesoficila
        url={"dashboard/activities"}
        columns = {columns}
        name={"actividad"}
        title={"Actividades"}
      />
    </section>
  );
}

export default ActividadesPage;
