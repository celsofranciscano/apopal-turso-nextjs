import Tablesoficila from "@/components/common/tables/TableOficial";
function ActividadesPage() {
  const columns = [
    "ID",
    "TipoActividad",
    "Creacion",
    "Descripcion",
  ];

  return (
    <section className="grid gap-4">
      <Tablesoficila
        url={"dashboard/activitytypes"}
        columns = {columns}
        name={"tipo actividad"}
        title={"Tipo de Actividades"}
      />
    </section>
  );
}

export default ActividadesPage;
