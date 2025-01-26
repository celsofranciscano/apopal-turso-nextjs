import Tablesoficila from "@/components/common/tables/TableOficial";
function ActividadesPage() {
  const columns = [
    "ID",
    "TipoActividad",
    "Descripcion",
    "Registrado",
  ];

  return (
    <section className="grid gap-4">
      <Tablesoficila
        url={"dashboard/activitytypes"}
        columns={columns}
        name={"actividad"}
        title={"Actividades"}
      />
    </section>
  );
}

export default ActividadesPage;
